# Snooful

![GitHub issues](https://img.shields.io/github/issues/Snooful/Snooful.svg?style=popout)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Snooful/Snooful.svg?style=popout)
[![Travis (.com)](https://img.shields.io/travis/com/Snooful/Snooful.svg?style=popout)](https://travis-ci.com/Snooful/Snooful)

The most complete bot for moderation, utility, and fun in Reddit Chat.

## Optional Dependencies

Some dependencies do not need to be installed for Snooful to function, but they do provide some features that will automatically disable if not present. Here is a reference to modules that do this and what changes when they aren't installed:

* `debug` - replaced with a basic write to `stdout`
* `dotenv` - you won't be able to set environment variables in `.env`
* `esrever` - reversing (the `reverse` command) won't account for fancy Unicode things
* `git-last-commit` - the most recent commit hash will never be shown in the `version` command
* `lodash.chunk` - some commands (`commands` and `listfaq`) will not be paginated

## Environment Variables

To use Snooful, you must set two variables for the user ID (`SNOOFUL_ID`) and refresh token (`SNOOFUL_TOKEN`). Currently, you must get these values from the local storage of Reddit, which can be done with the following:

1. Navigate to Reddit on a desktop browser.
2. Open your developer tools panel (using Chrome and Windows, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>).
3. Click the `Application` tab from the top bar (it may be collapsed).
4. Under the `Storage` section of the sidebar, expand `Local Storage` .
5. Click the `https://reddit.com` option under the newly expanded menu.
6. Find the entry with a key starting with `chat.session`.
7. Get the ID by finding it enclosed in square brackets after `chat.session` in the key, such as `chat.session[t2_XXXXX]`.
8. Get the token by reading the JSON-encoded value of this entry (most developer tools let you view a parsed version too) and finding the `token`, such as `{"token": "XXXXXXXXXXXXX"}`. 

You can also configure the prefix from the default `!` by setting `SNOOFUL_PREFIX`.

Since this project uses [`debug`](https://www.npmjs.com/package/debug), you can also set `DEBUG` to `snooful:*` to recieve logs of everything notable happening with Snooful. This package also has [other environment variables](https://github.com/visionmedia/debug#environment-variables) that can be set, which are:

* `DEBUG_HIDE_DATE`
* `DEBUG_COLORS`
* `DEBUG_DEPTH`
* `DEBUG_SHOW_HIDDEN`

Since this project uses [`dotenv`](https://www.npmjs.com/package/dotenv), your environment variables can be stored in `./.env`, which has been git-ignored, using the following syntax:

```
SNOOFUL_PREFIX=?
SNOOFUL_ID=t2_a1b2c3
SNOOFUL_TOKEN=f4k3_t0k3n
DEBUG=snooful:*
```
