# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [pre-release 0.4.2] - 2019-03-03

### Fixed
- Tasklist doesn't show expired tasks anymore
- `%task edit` doesn't replace spaces w/ commas anymore

--- 

## [pre-release 0.4.1] - 2019-03-03

### Fixed
- Bot emotes were not showing (got undefined instead)
- Removed some commands from the `%help`
- Tasklist channel now updates correctly after task edit

---

## [pre-release 0.4.0] - 2019-03-03 (now stable!)
### (This version prepares for the upcoming 1.0.0)
### (It also breaks a lot of previously existing features)

### Added
- `%task edit` command, to edit existing tasks
- `%prefix` command for per-guild prefix configuration (mods)
- `%conf` added a "reset" possibility to each entry (eg: `%conf channel tasklist reset`)
- `%tasklist update` to manually update the tasklist channel (mods)
- Continuous Integration using [Travis-CI](https://travis-ci.com/Woosy/CalendarBot)

### Fixed
- Fixed some random bugs

### Changed
- All tasks related commands are now regrouped in `%task` command
- Improved `%tasklist` display when a task doesn't have any description
- Improved code quality

---

## [pre-release 0.3.0] - 2019-03-03 (not stable!)
### (This version prepares for the upcoming 1.0.0)

### Fixed
- Error when using `%addtask` command while no role was set

### Changed
- Switched to a RethinkDB provider (NoSQL Database) for improved reliability and scaling possibilities

---

## [pre-release 0.2.2] - 2019-02-25 (not stable!)
### Added
- Dependabot badges in [README](https://github.com/Woosy/CalendarBot#readme)
- New separeted cron for dev env (every minute)
- Condition on `%addtask` : can't add tasks farther than 2 years in the future
- `%ev` command for bot admins in production env
- Title to tasklist's embed when no tasks 

### Fixed
- License badge in [README](https://github.com/Woosy/CalendarBot#readme)
- Random errors when using %addtask
- Changelog indentation problems
- Fetches last message in tasklist channel (if set)

### Changed
- Moved permission controls in `permissionLevel.js`
- `%conf show`'s display is now an embed

---

## [pre-release 0.2.1] - 2019-02-05 (not stable!)
### Added
- [Codacy integration](https://app.codacy.com/project/arthur-woosy/CalendarBot/dashboard?branchId=11150184). You can now keep track of the **code quality** on codacy.com.
- Added codacy badge to the [README.md](https://github.com/Woosy/CalendarBot/blob/master/README.md).
- [Dependabot integration](https://dependabot.com). Dependabot will now open PRs on the [develop](https://github.com/Woosy/CalendarBot/tree/develop) branch, with the latest **security updates**.
- [Changelog](https://github.com/Woosy/CalendarBot/blob/develop/CHANGELOG.md)! You will now be able to keep track of every changes!

### Changed
- Improved overall code quality.
- Changed config files to .env (this **is a breaking change**, even though it's a *minor version*).

---

## [pre-release 0.2.0] - 2019-02-01 (not stable!)
- *Pushed the whole project to github.*
