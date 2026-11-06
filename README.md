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

## v1.26 (Nov 4)
New demo: Try it with a coach, the shared smAisle frame. Three real moves on a tiny practice board, with a finger, a nudge on a wrong tap, and a You're ready popup. It replaces the old walkthrough. Cover link, How to Play and the first-time prompt all open it. `source/demo-frame.js` and `.css` are copies of the shared frame; do not edit them here.

## v1.28 (Nov 4)
When the game ends, a yellow ‹ smAisle Daily button sits beside See results on the finished board, so one tap always leaves. Shows on the website and in the app, same rule as the results popup.

## v1.29 (Nov 6)
Change your route before Depart: tap any stop in a filled row and the route redraws around it, or tap a chosen stop to take it and the stops below it back off.

## v1.30 (Nov 6)
Noon board, in the smAisle Daily app only (needs `window.SMD_APP`), for Plus members. A second board each day opens at noon Eastern (11:59 AM). The cover shows a Noon board row under Play today's board: Play, Keep playing or the result with Plus; "Noon board opens at noon" with a countdown before then; a locked Plus row without Plus (tapping it posts `{cmd:'plus'}` to the app). Same generator as the daily board, seeded `makePuzzle(dayNo + NOON_OFF)` with `NOON_OFF = 500000`, so it is the same for everyone and never repeats a daily board; `puzzcheck.js` now checks 1,100 noon boards too. Its own saves: `tk-n_<date>` (progress) and `tk-nhist` (results, own noon streak). It never writes `tk-d_`, `tk-hist`, Stats, the main streak, `smaisle_done`, `tk-usage` or check-ins. Archive gets Daily board / Noon board tabs for Plus in the app, with every past noon board. Results and share say Noon. The website is unchanged apart from the version.

## CalcRU-Late (timegame/) v1.10 (Nov 6)
CalcRU-Late lives in `timegame/`. Edit `timegame/source/` and run `python3 build.py` from that folder to rebuild `timegame/index.html`. Fixed free preview: in preview (`?preview=1` without Plus, or the app without Plus) the game is always the full five-train game of Fri Nov 6, 2026 (`PV_DAY='2026-11-06'`, No. 4), on every date. It was one train of today's game before. The preview runs in memory only: no `tr-d_` saves, no `tr-hist` results, streak or Stats, no `smaisle_done`, no `tr-usage` or check-ins. It shows "Preview" and "Preview game" instead of today's number and date. Archive, Stats and Share are hidden. The end screen says "Play a new one every day with smAisle Daily Plus" and has Get smAisle Daily Plus (posts `{cmd:'plus'}` in the app), the yellow ‹ smAisle Daily, and Play the preview again, which starts fresh. If Plus arrives mid-preview (`dgNative('store',{plus:true})`), the game switches to today's real game. The website without `?preview=1` and Plus players are unchanged apart from the version.
