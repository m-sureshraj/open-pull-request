import fetch from 'node-fetch';
import gitParseUrl from 'git-url-parse';
import open from 'open';
import Conf from 'conf';

import { isGitRepository, getBranchName, getRemoteUrl } from '../lib/git';
import { red, yellow, gray } from '../lib/colors';
import { Loader } from '../lib/loader';

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
  } catch (error) {
    console.error(red('Can not find the branch name'));
    console.error(error);
  }

  let remoteUrl = '';
  try {
    remoteUrl = getRemoteUrl();
  } catch (error) {
    console.error(red('Can not find the remote url'));
    console.error(error);
  }

  const { owner: repoOwner, name: repoName } = gitParseUrl(remoteUrl);

  const config = new Conf();
  const token = config.get('token');
  if (!token) {
    console.warn(
      gray(
        'Warning: Access token not provided. Cannot search pull-requests on private repositories.'
      )
    );
  }

  const loader = new Loader();

  try {
    const options = {
      method: 'post',
      body: JSON.stringify({
        query,
        variables: {
          repoOwner,
          repoName,
          branchName,
        },
      }),
    };

    if (token) {
      options.headers = {
        authorization: `Bearer ${token}`,
      };
    }

    loader.start();
    const response = await fetch('https://api.github.com/graphql', options);
    loader.stop();

    if (!response.ok) {
      const { message } = await response.json();
      // todo: add a help message
      console.log(red(message));
      return;
    }

    const { data } = await response.json();
    const { node } = data.repository.pullRequests.edges[0] ?? {};

    if (!node) {
      console.log(`No open pull request exists for the given branch: ${yellow(branchName)}`);
      return;
    }

    console.log(`${yellow('PR link:')} ${node.url}`);
    await open(node.url);
  } catch (error) {
    loader.stop();
    console.error(red('An unknown issue occurred'));
    console.error(error);
  }
}
