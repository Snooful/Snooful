# Snooful

![GitHub issues](https://img.shields.io/github/issues/Snooful/Snooful.svg?style=popout)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Snooful/Snooful.svg?style=popout)
[![Travis (.com)](https://img.shields.io/travis/com/Snooful/Snooful.svg?style=popout)](https://travis-ci.com/Snooful/Snooful)

The most complete bot for moderation, utility, and fun in Reddit Chat.

## Optional Dependencies

Some dependencies do not need to be installed for Snooful to function, but they do provide some features that will automatically disable if not present. Here is a reference to modules that do this and what changes when they aren't installed:

* [`debug`](https://www.npmjs.com/package/debug) - replaced with a basic write to `stdout`
* [`esrever`](https://www.npmjs.com/package/esrever) - reversing (the `reverse` command) won't account for [fancy Unicode things](https://mathiasbynens.be/notes/javascript-encoding)
* [`git-last-commit`](https://www.npmjs.com/package/git-last-commit) - the most recent commit hash will never be shown in the `version` command
* [`lodash.chunk`](https://www.npmjs.com/package/lodash.chunk) - some commands (like `commands` and `listfaq`) will not be paginated

## Configuration

Snooful uses JSON for configuration. This file is located at `./config.json`, and must be created manually.

### Credentials

To use Snooful, you must provide credentials, which are taken from [snoowrap](https://not-an-aardvark.github.io/snoowrap/snoowrap.html#snoowrap__anchor). The user agent cannot be set as it is automatically set to one containing the version. To get these, go to [applications](https://www.reddit.com/prefs/apps/) and generate a new app. Fill in the `credentials` object of configuration (see the [example config](#example_config) for what a script-type config would look like).

### Settings Manager

Snooful can store data for subreddits and groups. This is left to a separate module, which is configured with the `settingsManager` option. This value must be resolvable by `require()`, or else Snooful will not run. Because of this, it is necessary to `npm install` the settings manager before you set that option.

Here are some official settings manager modules:

* [`@snooful/sqlite-settings`](https://github.com/Snooful/SQLite-Settings)
* [`@snooful/json-settings`](https://github.com/Snooful/JSON-Settings)
* [`@snooful/yaml-settings`](https://github.com/Snooful/YAML-Settings)

Switching the settings manager does not transfer the existing data. However, you can use a tool to do this yourself.

### Prefix

You can also configure the prefix from the default `!` by setting `prefix.start`. The prefix is the thing that differentiates a command from a message. Basically, with a prefix of `?`, you must type `?ping` to run the `ping` command.

While disabled by default, it is also possible to configure a global prefix at `prefix.global`. This prefix works anywhere in a message, and everything after the prefix will be considered an argument to the command.

*Please change the prefix if you are hosting your own version of Snooful.*

### Debugging

Since this project uses [`debug`](https://www.npmjs.com/package/debug), you can also set the environment variable `DEBUG` to `snooful:*` to recieve logs of everything notable happening with Snooful. This package also has [other environment variables](https://github.com/visionmedia/debug#environment-variables) that can be set, which are:

* `DEBUG_HIDE_DATE`
* `DEBUG_COLORS`
* `DEBUG_DEPTH`
* `DEBUG_SHOW_HIDDEN`

These environment variables have no effect if `debug` is not installed.

### Example Config

Here is an example configuration:

```json
{
  "prefix": {
	"start": "?",
	"global": "--"
  },
  "credentials": {
    "clientId": "a897d89f89e",
    "clientSecret": "0202390301209919219810929012",
    "username": "Snooful-Example",
    "password": "h0pefully-s3cure"
  }
}
```

## Commands

Commands are stored in the `src/commands` folder. They are organized by category. You can add your own command by placing a file ending with `.js` in the folder. It must export an object adhering to the comamnd format as seen in the [`info` command](src/commands/snooful/info.js).

Please do not remove the commands in the `snooful` category, especially `info` and `github`.
