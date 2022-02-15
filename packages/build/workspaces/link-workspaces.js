/**
 * This tool will re-link monorepo packages to one of the following directories (by priority):
 * - {package}/package.json -> publishConfig.directory
 * - lerna.json -> command.publish.contents
 * - package root directory
 */
const path = require('path');
const get = require('lodash/get');
const fs = require('fs-extra');
const rimraf = require('rimraf');

async function symlink(src, dest) {
  if (process.platform !== 'win32') {
    // use relative paths otherwise which will be retained if the directory is moved
    src = path.relative(path.dirname(dest), src);
    // When path.relative returns an empty string for the current directory, we should instead use
    // '.', which is a valid fs.symlink target.
    src = src || '.';
  }

  try {
    const stats = await fs.lstat(dest);
    if (stats.isSymbolicLink()) {
      if (dest === src) {
        return;
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  // We use rimraf for unlink which never throws an ENOENT on missing target
  rimraf.sync(dest);

  if (process.platform === 'win32') {
    // use directory junctions if possible on win32, this requires absolute paths
    await fs.symlink(src, dest, 'junction');
  } else {
    await fs.symlink(src, dest);
  }
}

const defaults = {
  whitelist: [],
  blacklist: [],
};

exports.linkWorkspaces = async ({whitelist, blacklist} = defaults) => {
  console.log(`Linking project workspaces...`);

  whitelist = (whitelist || []).map(p => path.resolve(p));
  blacklist = (blacklist || []).map(p => path.resolve(p));
  // Filter packages to only those in the whitelisted folders
  const packages = require('get-yarn-workspaces')(process.cwd())
    .map(pkg => pkg.replace(/\//g, path.sep))
    .filter(pkg => {
      const isBlacklisted = blacklist.some(b => pkg.startsWith(b));
      if (isBlacklisted) {
        return false;
      } else if (whitelist.length === 0) {
        return true;
      }
      return whitelist.some(w => pkg.startsWith(w));
    });

  const lernaJson = path.resolve('lerna.json');
  const lerna = fs.existsSync(lernaJson) ? require(lernaJson) : null;

  let count = 0;
  for (const item of packages) {
    const packageJson = path.resolve(item, 'package.json');
    if (!fs.existsSync(packageJson)) {
      continue;
    }

    const pkg = require(packageJson);

    let targetDirectory = get(pkg, 'publishConfig.directory');
    if (!targetDirectory && lerna) {
      targetDirectory = get(lerna, 'command.publish.contents');
    }

    const link = path.resolve('node_modules', pkg.name);
    const target = path.resolve(item, targetDirectory || '.');

    if (!fs.existsSync(target)) {
      fs.mkdirpSync(target);
    }

    count++;
    try {
      console.log(`Linking #${count} (${target} -> ${link})`);
      await fs.mkdirp(path.dirname(link));
      await symlink(target, link);
    } catch (err) {
      console.log(`Failed ${pkg.name}: ${err.message}`);
    }
  }

  console.log(`Successful linked ${count} project workspaces!`);
};
