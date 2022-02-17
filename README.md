# open-pull-request
open-pull-request is a tiny command-line utility to open the associated 
pull request of the branch in the browser. Currently, it supports 
GitHub's public and private repositories.

### How does it work?
First, it figures out the repository details from the remote URL (`git remote -v`). 
Then it checks whether the current branch has an open pull request. 
If it does, then it opens the pull request in the browser.

## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) version `>= 12` installed.

## Installation
```
npm install -g open-pull-request
```

You can verify the installation by running the `op help` command, which prints the usage information.

## Setup
1. Create a personal access token.\
   You can follow [this guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create a personal access token on GitHub.
   Give `private repositories` scope to open pull requests of private repositories.
   
   ![repository scope](./media/scope.png)

   Otherwise, the `public_repo` scope is sufficient for public repositories.


3. Run the `op token` command to save the token.

   ![add token cmd](./media/op-token-cmd.png)

## Usage
Just run the `op` command from any local branch.

```
> op help

open-pull-request (v0.1.0)

 A command-line utility to open the associated pull request of the branch in the browser

 Usage:
   op 		open the associated pull request of the branch in the browser
   op token 	Add personal access token
   op help 	Show this message
```

## license
MIT © [Sureshraj](https://github.com/m-sureshraj)
