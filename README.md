# Snooful

The most complete bot for moderation, utility, and fun in Reddit Chat.

## Environment Variables

To use Snooful, you must set two variables for the user ID (`SNOOFUL_ID`) and refresh token (`SNOOFUL_TOKEN`). You can also configure the prefix from the default `!` by setting `SNOOFUL_PREFIX`.

The [dashboard](https://github.com/Snooful/Snooful-Dashboard) can be enabled or disabled (`SNOOFUL_DASH_ENABLED`). You can also configure the port (`SNOOFUL_DASH_PORT`), client ID (`SNOOFUL_DASH_ID`), and client secret (`SNOOFUL_DASH_SECRET`). The last two are necessary for logins to be possible.

Since this project uses [`debug`](https://www.npmjs.com/package/debug), you can also set `DEBUG` to `snooful:*` to recieve logs of everything notable happening with Snooful. This package also has other environment variables that can be set, which are:

* `DEBUG_HIDE_DATE`
* `DEBUG_COLORS`
* `DEBUG_DEPTH`
* `DEBUG_SHOW_HIDDEN`
