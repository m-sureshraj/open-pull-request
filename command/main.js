import fetch from 'node-fetch';
import gitParseUrl from 'git-url-parse';
import open from 'open';
import Conf from 'conf';

import { isGitRepository, getBranchName, getRemoteUrl } from '../lib/git';
import { red, yellow } from '../lib/colors';
import { Loader } from '../lib/loader';
import { debug } from '../lib/util';

const query = `
   query findOpenPullRequest($repoOwner: String!, $repoName: String!, $branchName: String!) {
        repository(owner: $repoOwner, name: $repoName) {
            pullRequests(headRefName: $branchName, first: 1, states: OPEN) {
                edges {
                    node {
                        url
                    }
                }
            } 
        }
   }
`;

export async function main() {
  if (!isGitRepository()) {
    console.log(yellow('Not a git repository'));
    return;
  }

  let branchName = '';
  try {
    branchName = getBranchName();
    debug({ branchName });
  } catch (error) {
    console.error(red('Can not find the branch name'));
    console.error(error);
    return;
  }

  let remoteUrl = '';
  try {
    remoteUrl = getRemoteUrl();
    debug({ remoteUrl });
  } catch (error) {
    console.error(red('Can not find the remote url'));
    console.error(error);
    return;
  }

  const { owner: repoOwner, name: repoName } = gitParseUrl(remoteUrl);
  debug({ repoOwner, repoName });

  const config = new Conf();
  const token = config.get('token');
  if (!token) {
    console.error(red('Access token not provided'));
    console.log('Refer to the setup instruction: https://github.com/m-sureshraj/open-pull-request#setup');
    return;
  }

  const loader = new Loader();

  try {
    const options = {
      method: 'post',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          repoOwner,
          repoName,
          branchName,
        },
      }),
    };
    debug({ queryParams: { ...options, headers: { authorization: 'Bearer ****' }} });

    loader.start();
    const response = await fetch('https://api.github.com/graphql', options);
    debug({ status: response.status, statusText: response.statusText });
    loader.stop();

    if (!response.ok) {
      const data = await response.json();
      debug({ data });
      console.log(red(data.message));
      return;
    }

    const { data } = await response.json();
    debug(`Received data: `, { data: JSON.stringify(data) });
    const { node } = data.repository.pullRequests.edges[0] ?? {};

    if (!node) {
      debug({ node });
      console.log(`No open pull request exists for the given branch: ${yellow(branchName)}`);
      return;
    }

    console.log(`${yellow('PR link:')} ${node.url}`);
    await open(node.url);
  } catch (error) {
    loader.stop();
    console.error(red('An unknown error occurred'));
    console.error(error);
  }
}
