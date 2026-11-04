import pathlib,re
d=pathlib.Path(__file__).parent
s=(d/'src.html').read_text()
s=s.replace('/*PUZZLE*/',re.sub(r'\bW\b','BW',(d/'puzzle.js').read_text()))
g=(d/'game.js').read_text().replace('/*BOARD*/',(d/'board.js').read_text())
s=s.replace('/*DEMOCSS*/',(d/'demo-frame.css').read_text().strip()).replace('/*DEMOJS*/',(d/'demo-frame.js').read_text().strip())
s=s.replace('/*SOUNDLIB*/',(d/'sound.js').read_text()).replace('/*GAME*/',g)
(d.parent/'index.html').write_text(s)
art=re.sub(r'<link rel="(manifest|apple-touch-icon|icon)"[^>]*>\n','',s)
(d.parent/'index-artifact.html').write_text(art)
print(len(s))
