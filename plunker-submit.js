class PlunkerSubmit {

  constructor(options) {
    this.formFields = [];
    this.indexHeads = [];
    this.indexBody = '';

    this.document = options.document || document; // so that this can be run from other window
    this.options = options;
  }

  // return index.html file for plunker
  get indexHtml() {
    let output = '';
    if (this.indexBody.match(/<\/html>/)) { // full html is here
      output = this.indexBody;
      (!this.indexBody.match(/<\/body>/)) &&  // if no body tag, add one
        (output = output.replace(/<\/html>/, '\n<body>\n</body>\n</html>'));
      (!this.indexBody.match(/<\/head>/)) &&  // if no head tag, add one
        (output = output.replace(/<body/, '\n<head>\n</head>\n<body'));
      // add head tags into head.
      output = output.replace(/<\/head>/, this.indexHeads.join('\n')+'\n</head>');
    } else {
      output = [
        '<!DOCTYPE html>', '<html>', 
        '<head>', this.indexHeads.join('\n'), '</head>',
        '<body>', this.indexBody, '</body>', '</html>'
      ].join('\n');
    }
    return output;
  }

  // set description of the plunker
  set description(description) {
    this.formFields.push({name: 'description', value: description});
  }

  // add tags within head tag of index.html. e.g. '<meta foo="123" bar="456" />'
  addHead(headLine) {
    this.indexHeads.push(headLine);
  }

  // set the body contents index.html. 
  setBody(html) {
    this.indexBody = html;
  }

  // add a file to plunker, also add it to <head> tag of index.html if .js or .css
  addFile(fileName, contents) {
    this.formFields.push({name: `files[${fileName}]`, value: contents});
    if (fileName.endsWith('.js')) {
      this.addHead(`<script src="${fileName}"></script>`);
    } else if (fileName.endsWith('.css')) {
      this.addHead(`<link href="${fileName}" rel="stylesheet">`);
    }
    return this;
  }

  // submit to plunker
  submit() {
    let form = this.document.createElement('form');
    let indexFile = {name: 'files[index.html]', value: this.indexHtml};
    let submit = this.document.createElement('input');
    let files = [indexFile, ...this.formFields];

    form.style.display = 'none';
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
    form.setAttribute('target', '_blank')

    files.forEach(field => {
      let input = this.document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', field.name);
      input.setAttribute('value', field.value);
      form.appendChild(input);
    });

    submit.setAttribute('type', 'submit');
    form.appendChild(submit);

    this.document.body.appendChild(form);
    submit.click();
    this.document.body.removeChild(form);
  }
}

export default PlunkerSubmit;