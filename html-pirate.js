class HTMLPirate {

  constructor(el, options) {
    this.el = el;
    this.document = options.document || document; // so that this can be run from other window
    this.options = options || {
      visibleOnly: true,
      replacements: null
    };
  }

  // return all parent elements of the given element
  // this must not return cloned elements because it's checking against styling later
  get parentElements() { 
    let pos = this.el, parents = [];
    while (pos = pos.parentNode) {
      parents.unshift(pos);
    }
    return parents;
  }

  // returns full html of the given element including parent elements
  // <html><body><div><div><my-el></my-el></div></div></body>
  getIt() {
    let parentEls = this.parentElements;
    let htmlEl, parentEl, cloned;
    parentEls.forEach(el => {
      if (!el.outerHTML) { // document
      } else if (el instanceof HTMLHtmlElement) {
        htmlEl = el.cloneNode(false);
        parentEl = htmlEl;
      } else {
        cloned = el.cloneNode(false);
        parentEl.appendChild(cloned);
        parentEl = cloned;
      }
    })
    this._markInvisibleEls(); // set which is invisible before clone happens
    cloned = this.el.cloneNode(true);
    this._unmarkInvisibleEls();
    if (this.options.visibleOnly !== false) { // remove hidden elements from html generation
      cloned = this._removeHiddenElements(cloned);
    }
    parentEl.appendChild(cloned);

    let htmlStr =  '<!DOCTYPE html>\n'+htmlEl.outerHTML;
    this.options.replacements && (htmlStr = this._getReplacedHtmlStr(htmlStr));
    return htmlStr;
  }

  // set `style-pirate-hidden` to hidden elements, so that it can be removed
  _markInvisibleEls() {
    let all = Array.from(this.el.getElementsByTagName("*"));
    all.filter(e => !e.offsetParent).forEach(el => {
      el.setAttribute('style-pirate-hidden',1)
    });
  }

  // delete attribute `style-pirate-hidden` since it is added by this class
  _unmarkInvisibleEls() {
    let all = Array.from(this.el.getElementsByTagName("[style-pirate-hidden=1]"));
    all.forEach(el => el.removeAttribute('style-pirate-hidden'));
  }

  // replace htmlstring with the given options, and returns the replaced string
  _getReplacedHtmlStr(str) {
    let htmlStr = str;
    if (this.options.replacements) {
      this.options.replacements.forEach(replacement => {
        let regex  = replacement.regex;
        let newStr = replacement.newStr;
        htmlStr = htmlStr.replace(regex, newStr);
      });
    }
    return htmlStr;
  }

  // remove hidden elements(marked with an attribute) from list of cloned elements
  _removeHiddenElements(clonedEl) {
    let hiddenEls = Array.from(clonedEl.querySelectorAll('[style-pirate-hidden]'));
    hiddenEls.forEach(el => el.remove());
    return clonedEl;
  }

}

module.exports = HTMLPirate;
