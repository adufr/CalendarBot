# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
