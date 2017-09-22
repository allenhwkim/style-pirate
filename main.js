import HTMLPirate from './html-pirate';
import CSSPirate from './css-pirate';
import PlunkerSubmit from './plunker-submit';

class Main {
  // el : a html element
  // options: 
  //   document: document element to process. e.g. window.document
  //   visibleOnly: true or false. if false, ignore all hidden elements
  //   replacements: array of replacement, replace html with given regex and new string
  //     e.g. {regex: /<!--[\s\S]*?-->/g, newStr: ''}
  constructor(el, options={}) {
    this.htmlPirate = new HTMLPirate(el, options);
    this.cssPirate = new CSSPirate(el, options);
    this.style = null;

    this.document = options.document || document;
    this.options = options;
  }

  // returns html, and css for the element
  getIt() {
    let html = this.htmlPirate.getIt();
    let css = this.cssPirate.getIt();

    return {
      html,
      style: this._replaceCssUrls(css.style),
      keyframes: css.keyframes,
      fonts: this._replaceCssUrls(css.fonts),
      plunker: this.submitToPlunker.bind(this)
    }
  }

  // submit to plnkr.com with html and css
  submitToPlunker() {
    (!this.style) && (this.style = this.getIt());
    let plunkerSubmit = new PlunkerSubmit(this.options);

    plunkerSubmit.description = 'StylePirate by Allen Kim';
    plunkerSubmit.addFile('styles.css', this.style.style); 
    plunkerSubmit.addFile('keyframes.css', this.style.keyframes); 
    plunkerSubmit.addFile('fonts.css', this.style.fonts); 
    plunkerSubmit.setBody(this.style.html);
    plunkerSubmit.submit();
  }

  // returns all url-replaced css text. e.g.
  // from 'url(./foo.png)' to 'url(https://my.site.com/path/foo.png)'
  _replaceCssUrls(cssText) {
    let urlMatches = cssText.match(/url\(['"]?([^'"]+)['"]?\)/g) || [];
    urlMatches.forEach(urlStr => {
      let href = urlStr.match(/url\(['"]?(.*?)['"]?\)/)[1];
      let link = this.document.createElement("a");
      link.href = href;
      let absUrl = link.protocol+"//"+link.host+link.pathname+link.search+link.hash;
      let absCssUrl = 'url('+absUrl+')';
      cssText = cssText.replace(urlStr, absCssUrl)
    });
    return cssText;
  }

}

export default Main;

// $0 = document.querySelector('#nav-context-bar');
// var main = new Main($0, {
//   visibleOnly: true,
//   replacements: [
//     {regex: /<!--[\s\S]*?-->/g, newStr: ''},
//     {regex: /ng-[a-z\-]+=['"][\s\S]*?['"]/g, newStr: ''}
//   ]
// })
// var style = main.getIt();
// main.createPlunker();

