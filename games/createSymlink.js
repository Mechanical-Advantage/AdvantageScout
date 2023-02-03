const symlinkDir = require('symlink-dir')
const path = require('path')

if (process.argv.length > 2) {
    const game = process.argv[2];
    symlinkDir(path.join("config", game), "current");
} else {
    throw new Error("No game was provided");
}