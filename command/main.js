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
        console.warn(gray('Warning: Access token not provided. Cannot search pull-requests on private repositories.'));
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
                    branchName
                },
            }),
        };

        if (token) {
            options.headers = {
                authorization: 'Bearer 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',
            };
        }

        loader.start();
        // const response = await fetch('https://api.github.com/graphql', options);
        // const { data } = await response.json();
        // loader.stop();

        console.log(data?.repository);
    } catch (error) {
        loader.stop();
        console.error(red('Encountered an issue while fetching the data'));
        console.error(error);
    }
}
