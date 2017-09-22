class CSSPirate {

  constructor(el, options) {
    this.el = el;
    this.document = options.document || document; // so that this can be run from other window
    this.options = options || {
      styleSheets: undefined
    };
    this.elCssRules = []; // cssRule collection for all elements
    this.fontRules = [];
    this.keyframesRules = [];
  }

  // returns style sheets to process. default. document.styleSheets
  get styleSheets() {
    return this.options.styleSheets || this.document.styleSheets;
  }

  // returns parent elements or the given elements starting with <!doctype>, <html>, and etc
  get parentElements() { 
    let pos = this.el, parents = [];
    while (pos = pos.parentNode) { parents.unshift(pos) };
    return parents;
  }

  // returns all visible elements including all children elements
  // this must NOT return cloned elements because it's checking against styling later
  get visibleSectionElements() {
    var allEls = Array.from(this.el.getElementsByTagName("*"));
    allEls.unshift(this.el);
    return allEls.filter(el => el.offsetParent);
  }

  // return css texts groupd by css, keyframs, and fonts
  // from the given cssRules, collect element matching rules for each element
  getIt() {
    let styleSheets = this.styleSheets;
    let parentEls   = this.parentElements;
    let sectionEls  = this.visibleSectionElements;
    this.elCssRules = parentEls.concat(sectionEls).map(
      el => ({ el: el, cssRules: [] })
    );

    let styleSheet, cssRule;
    for (var i = 0; i < styleSheets.length; i++) {
      styleSheet = styleSheets[i];
      console.log('StylePirate: processing ',
        styleSheet.cssRules && styleSheet.cssRules.length,
        'rules of', styleSheet.href);
      // some styleSheet does not have rules, maybe broken?
      if (styleSheet.cssRules) { 
        this._processCssRules(styleSheet.cssRules);
      }
    }

    //this.elCssRulesl
    return {
      style: this._getCss(parentEls) + 
        '\n /* -------------------------------------------------------- */\n' +
        this._getCss(sectionEls),
      keyframes: this.keyframesRules.map(rule => rule.cssText).join('\n'),
      fonts: this.fontRules.map(rule => rule.cssText).join('\n')
    };
  }

  // returns a clone object from given cssRule and extended properties
  // Why clone? because we must NOT alter the existing cssRule
  _getClonedRule(cssRule, extended) {
    let clonedRule = Object.assign(extended || {}, {
      cssText: cssRule.cssText,
      parentRule: cssRule.parentRule,
      parentSytleSheet: cssRule.parentStyleSheet,
      selectorText: cssRule.selectorText,
      style: cssRule.style,
      type: cssRule.type
    });
    clonedRule.cssText = clonedRule.cssText.replace(/[^\u0000-\u00ff]/g, $ => {
      return this._toUTF16($.charCodeAt(0)).replace(/\\u/,'\\');
    });

    return clonedRule;
  }

  // returns utf16 characters from the given character code
  // e.g., this._toUTF16('A'.charCodeAt(0)).replace(/\\u/,'\\');
  _toUTF16(codePoint) {
    var TEN_BITS = parseInt('1111111111', 2);
    function u(codeUnit) {
      return '\\u'+codeUnit.toString(16).toUpperCase();
    }

    if (codePoint <= 0xFFFF) {
      return u(codePoint);
    }
    codePoint -= 0x10000;
    
    // Shift right to get to most significant 10 bits
    var leadSurrogate = 0xD800 + (codePoint >> 10);

    // Mask to get least significant 10 bits
    var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

    return u(leadSurrogate) + u(tailSurrogate);
  }

  // returns css texts of the list of elements
  _getCss(limitToEls) {
    let el, cssRules;
    let conditionTexts = {}; // key: condition, value : array of css rule
    let cssTexts= [];;
    let output = '';

    this.elCssRules.forEach(elCssRule => {
      [el, cssRules] = [elCssRule.el, elCssRule.cssRules];
      if (limitToEls.includes(el)) {
        cssRules.forEach(cssRule => {
          // if normal css, add it to cssTexts, if not add it to conditionTexts;
          if (cssRule.conditionText) {
            conditionTexts[cssRule.conditionText] = conditionTexts[cssRule.conditionText] || [];
            if (!conditionTexts[cssRule.conditionText].includes(cssRule.cssText)) {
              conditionTexts[cssRule.conditionText].push(cssRule.cssText);
            }
          } else {
            if (!cssTexts.includes(cssRule.cssText)) {
              cssTexts.push(cssRule.cssText);
            }
          }
        })
      }
    })

    //group conditionTexts, and add to cssTexts;
    Object.keys(conditionTexts).forEach(conditionText => {
      let output = [].concat(
        conditionText + '{', 
        conditionTexts[conditionText].map(el => '  '+el),
        '}'
      );
      cssTexts.push(output.join('\n'));
    })

    return cssTexts.join('\n');
  }

  // return css of the given element
  //   cssRules: cssRules of a a styleSheet e.g. document.styleSheets[1].cssRules
  //   conditionText: conditionText attached to the cssRules. 
  //     for CSSRule, there is no conditionText, 
  //     but for CSSMediaRule, there is condition text. e.g., `@media (min-width: 1012px)`
  _processCssRules(cssRules, conditionText) {

    for (var j = 0; j < cssRules.length; j++) {
      let cssRule = cssRules[j];

      // if css rule and element matches, collect rules
      if (cssRule instanceof CSSStyleRule) {
        this.elCssRules.forEach(elCssRule => {
          // remove pseudo class(elements) for element.matches call
          // ref. https://www.w3.org/TR/selectors-api/#grammar
          let selector = cssRule.selectorText
            .replace(/^[ ]*:[:a-z\-]+(\([^\)]+\))?/, '*')
            .replace(/ \\?:[:a-z\-]+(\([^\)]+\))?/g, ' *')
            .replace(/\\?:[:a-z\-]+\([^\)]+\)/g, '') // e.g. audio:not([controls]),
            .replace(/\\?:[^, \]]+/g, '');

          // (selector === '') && (selector = '*'); // incase  ':before'

          try {
            if (!elCssRule.el.matches) { // #document does not have this function
            } // if the given css rule is for this element
            else if (elCssRule.el.matches(selector)) { 
              // must not make change on existing css rule if add any extra attrs.
              let cloned = this._getClonedRule(
                cssRule, {conditionText: conditionText}
              );
                                                    
              elCssRule.cssRules.push(cloned);
            }
          } catch(e) {
            console.error('Invalid selector found', cssRule.selectorText, e);
          }
        })
      } 

      // collect all font rules
      else if (cssRule instanceof CSSFontFaceRule) {
        this.fontRules.push(cssRule);
      } 

      // collect all keyframe rules
      else if (cssRule instanceof CSSKeyframesRule) {
        this.keyframesRules.push(cssRule);
      } 

      // for media rule, add condition text and collect matching css rules
      else if (cssRule instanceof CSSMediaRule) {
        let mediaRule = cssRule;
        let conditionText = '@media '+mediaRule.conditionText;
        this._processCssRules(mediaRule.cssRules, conditionText);
      }

      // rules that are not processing
      //  CSSImportRule    // @import
      //  CSSKeyFramesRule // @keyframes
      //  CSSSupportsRule  // @supports
      //  CSSPageRule      // @page
      else {
        console.warn('found non-processing rule', cssRule);
      }
    }
  }

}

export default CSSPirate;
