const debug = require("./debug.js").settings;

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

		/**
		 * The settings cache.
		 */
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

		this.database.all("SELECT CAST(subreddit as TEXT) as subreddit, settings FROM settings").then(rows => {
			debug("got rows of settings");
			rows.forEach(row => {
				debug("caching settings for r/%s", row.subreddit);
				this.settings[row.subreddit] = JSON.parse(row.settings);
			});
		});

		this.database.prepare("INSERT OR REPLACE INTO settings VALUES(?, ?)").then(statement => {
			debug("prepared the set statement");
			this.setStatement = statement;
		});
	}

	async update(subreddit) {
		debug(`updating settings database for r/${subreddit}`);
		return await this.setStatement.run(subreddit, JSON.stringify(this.settings[subreddit]));
	}

	/**
	 * Sets a key for a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to save the setting under.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 */
	async set(subreddit, key, value) {
		// Update our cache
		if (!this.settings[subreddit]) {
			debug(`making settings row for r/${subreddit} as it did not have one`);
			this.settings[subreddit] = {};
		}

		debug(`set '${key}' to '${value}' for r/${subreddit}`);
		this.settings[subreddit][key] = value;

		return this.update(subreddit);
	}

	/**
	 * Clears a key for a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to clear the setting in.
	 * @param {string} key The key to clear.
	 */
	async clear(subreddit, key) {
		// Update our cache
		if (!this.settings[subreddit]) {
			debug(`making settings row for r/${subreddit} as it did not have one`);
			this.settings[subreddit] = {};
		}

		debug(`cleared '${key}' for r/${subreddit}`);
		this.settings[subreddit][key] = undefined;

		return this.update(subreddit);
	}

	/**
	 * Gets a key from a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to get the setting under.
	 * @param {string} key The key to get.
	 * @returns *
	 */
	get(subreddit, key) {
		if (this.settings[subreddit]) {
			return this.settings[subreddit][key];
		} else {
			return undefined;
		}
	}

	/**
	 * A wrapper around the settings manager with methods applying to the current subreddit.
	 */
	subredditWrapper(subreddit) {
		return {
			/**
			 * Sets a key for the current subreddit namespace.
			 * @param {string} key The key to set.
			 * @param {*} value The value to be set.
			 */
			set: (key, value) => this.set(subreddit, key, value),
			/**
			 * Clears a key for the current subreddit namespace.
			 * @param {string} key The key to clear.
			 */
			clear: key => this.clear(subreddit, key),
			/**
			 * Gets a key from the current subreddit namespace.
			 * @param {string} key The key to get.
			 * @returns *
			 */
			get: key => this.get(subreddit, key),
			manager: this,
		}
	}
}

module.exports = SettingsManager;