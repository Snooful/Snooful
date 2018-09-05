# Snooful

The most complete bot for moderation, utility, and fun in Reddit Chat.

## Environment Variables

Snooful and its dependencies have multiple environment variables that you may configure.

Since this project uses [`dotenv`](https://www.npmjs.com/package/dotenv), your environment variables can be stored in `./.env`, which has been git-ignored, using the following syntax:

```
SNOOFUL_PREFIX=?
SNOOFUL_ID=t2_a1b2c3
SNOOFUL_TOKEN=f4k3_t0k3n
DEBUG=snooful:*
```

### ID and Token

To use Snooful, you must set two variables for the user ID (`SNOOFUL_ID`) and refresh token (`SNOOFUL_TOKEN`). Currently, you must get these values from the local storage of Reddit, which can be done with the following:

1. Navigate to Reddit on a desktop browser.
2. Open your developer tools panel (using Chrome and Windows, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>).
3. Click the `Application` tab from the top bar (it may be collapsed).
4. Under the `Storage` section of the sidebar, expand `Local Storage` .
5. Click the `https://reddit.com` option under the newly expanded menu.
6. Find the entry with a key starting with `chat.session`.
7. Get the ID by finding it enclosed in square brackets after `chat.session` in the key, such as `chat.session[t2_XXXXX]`.
8. Get the token by reading the JSON-encoded value of this entry (most developer tools let you view a parsed version too) and finding the `token`, such as `{"token": "XXXXXXXXXXXXX"}`.

### Settings Manager

Snooful can store data for subreddits and groups. This is left to a separate module, which is configured with the `SNOOFUL_SETTINGS_MANAGER` environment variable, and must be resolvable by `require()`. Of course, you probably will need to `npm install` your module. We support either of these modules:

* [`@snooful/sqlite-settings`](https://github.com/Snooful/SQLite-Settings)
* [`@snooful/json-settings`](https://github.com/Snooful/JSON-Settings)

### Command Prefix

You can also configure the prefix from the default `!` by setting `SNOOFUL_PREFIX`.

### Debugging

Since this project uses [`debug`](https://www.npmjs.com/package/debug), you can also set `DEBUG` to `snooful:*` to recieve logs of everything notable happening with Snooful. This package also has [other environment variables](https://github.com/visionmedia/debug#environment-variables) that can be set, which are:

* `DEBUG_HIDE_DATE`
* `DEBUG_COLORS`
* `DEBUG_DEPTH`
* `DEBUG_SHOW_HIDDEN`