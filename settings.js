const debug = require("debug")("snooful:settings");

/**
 * Manages settings.
 */
class SettingsManager {
	/**
	 * @param {SQLiteDatabase} database The database to store settings in.
	 */
	constructor(database) {
		this.database = database;
		this.init();

		this.settings = {};

		this.setStatement = null;
	}

	/**
	 * Initializes the database.
	 */
	async init() {
		await this.database.run("CREATE TABLE IF NOT EXISTS settings (subreddit VARCHAR(20) PRIMARY KEY, settings TEXT)").then(() => {
			debug("ensured the settings table exists");
		});

		const rows = this.database.all("SELECT CAST(subreddit as TEXT) as subreddit, settings FROM settings").then(rows => {
			debug("got rows of settings");
			rows.forEach(row => {
				debug("importing settings for r/%s", row.subreddit);
				this.settings[row.subreddit] = JSON.parse(row.settings);
			})
		});

		this.setStatement = await this.database.prepare("INSERT OR REPLACE INTO settings VALUES(?, ?)").then(() => {
			debug("prepared the set statement");
		});
	}

	/**
	 * Sets a key for a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to save the setting under.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 */
	async set(subreddit, key, value) {
		// Update our cache
		this.settings[subreddit][key] = value;

		return await this.setStatement.run(subreddit, JSON.stringify({
			[key]: value,
		}));
	}

	/**
	 * Gets a key from a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to get the setting under.
	 * @param {string} key The key to get.
	 * @returns *
	 */
	get(subreddit, key) {
		return this.settings[subreddit][key];
	}
}

module.exports = SettingsManager;