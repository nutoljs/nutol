const {linkWorkspaces} = require('./link-workspaces');

const allWorkspaces = () => {
  const path = require('path');
  return require('get-yarn-workspaces')().map(pkg => pkg.replace(/\//g, path.sep));
};

module.exports = {allWorkspaces, linkWorkspaces};
