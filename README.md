# Trackulate

A smAisle number game (Plus for now). Route the train through stops that change the passenger count, then reach the crossing with the exact number. Three trains a day. One board a day, same for everyone, new at midnight Eastern.

- Play: https://smaisle.app/Trackulate/ (preview: ?preview=1)
- Usage: Firestore `tk_devices`, owner page `owner.html`. `r` map = the train that made it (1-3), 0 = derailed all three.
- Build: edit `source/`, run `python3 source/build.py`. It writes `index.html` (GitHub) and `index-artifact.html` (Claude copy). Keep them on the same version.
- `source/puzzcheck.js` checks 1,100 days of boards for exactly one winning route. `source/play.js` plays through the game in a browser.

## v1.0 (Nov 2)
First version. Daily board, 3 trains, Archive, Stats, streak, share, Settings, Navy, sound, demo, Plus preview (first train free).

## v1.1 (Nov 2)
New ticket icon (Jeff picked D).
