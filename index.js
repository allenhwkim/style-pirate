import Main from './main';
import HTMLPirate from './html-pirate';
import CSSPirate from './css-pirate';
import PlunkerSubmit from './plunker-submit';

export {Main, HTMLPirate, CSSPirate, PlunkerSubmit};

var it;
export function run($0, options) {
  if (!$0) {
    console.error("no element provided as the first argument");
  } else {
    let main = new Main($0, options);
    it = main.getIt();
    return it;
  }
}

export function plunker($0, options) {
  it = it || run($0, options);
  it.plunker();
}