# Snooful

The most complete bot for moderation, utility, and fun in Reddit Chat.

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
