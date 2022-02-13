/*
========

Usage:
  node ./bin/link-workspaces

========
*/

'use strict';

const {linkWorkspaces} = require('../workspaces');

async function run(argv, options) {
  await linkWorkspaces();
}

module.exports = run;
if (require.main === module) run(process.argv).catch(console.error);
