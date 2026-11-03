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

## v1.2 (Nov 2)
New train whistle (Jeff picked Deeper B) at Depart and at the station.

## v1.3 (Nov 2)
Easier-to-read stops: bold plain numbers, all one size (Jeff picked B).

## v1.4 (Nov 3)
The board opens with no route picked. Tap one stop in every row, then Depart. First-time players are offered the demo.

## v1.13 (Nov 3)
One way home, same in every daily game: the yellow ‹ smAisle Daily button sits at the top left in the same spot on the cover and in the game, and smAisle Home is one small line next to the version at the bottom of the cover.

## v1.14 (Nov 3)
The yellow ‹ smAisle Daily button shows on the cover only, never during play. In the game the way back is the ‹ smAisle Daily row in the menu.

## v1.15 (Nov 3)
Same menu as Straight Down Spell: Back to game; a grid of Archive, Stats, How to Play, plus a Plus row that shows only without Plus and opens the Plus offer; Home Screen beside the yellow smAisle Daily; Settings; the version. The demo is in How to Play.
