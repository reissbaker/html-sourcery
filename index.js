(function() {
  /*
  	Utility functions.
  	==================
  */
  var Tag, Template, VoidTag, attrsToHTML, endTagHTML, exportTag, exportVoidTag, isArray, normalTags, ntag, startTagHTML, tag, toHTML, typeOf, voidTags, voidtag, vtag, _i, _j, _len, _len2;
  var __slice = Array.prototype.slice;
  isArray = function(value) {
    var s;
    s = typeof value;
    if (s === 'object' && value && value instanceof Array) {
      return true;
    }
    return false;
  };
  typeOf = function(value) {
    if (isArray(value)) {
      return 'array';
    }
    return typeof value;
  };
  /*
  	HTML conversion.
  	================
  */
  toHTML = function(content) {
    var allContent, entity, _i, _len;
    if (typeOf(content) === 'array') {
      allContent = '';
      for (_i = 0, _len = content.length; _i < _len; _i++) {
        entity = content[_i];
        allContent += toHTML(entity);
      }
      return allContent;
    }
    if (typeOf(content) === 'function') {
      return toHTML(content());
    }
    if (typeOf(content) === 'string') {
      return content;
    }
    return content.toHTML();
  };
  /*
  	helper functions
  	----------------
  */
  attrsToHTML = function(attrs) {
    var attrsString, property;
    attrsString = '';
    for (property in attrs) {
      attrsString += "" + property + "=\"" + attrs[property] + "\" ";
    }
    if (attrsString.length > 0) {
      attrsString = attrsString.substring(0, attrsString.length - 1);
    }
    return attrsString;
  };
  startTagHTML = function(name, attrs) {
    var attrsHTML;
    attrsHTML = attrsToHTML(attrs);
    if (attrsHTML.length > 0) {
      return "<" + name + " " + attrsHTML + ">";
    } else {
      return "<" + name + ">";
    }
  };
  endTagHTML = function(name) {
    return "</" + name + ">";
  };
  /*
  	classes
  	-------
  */
  Tag = (function() {
    function Tag(name, attrs, content) {
      this.name = name;
      this.attrs = attrs;
      this.content = content;
    }
    Tag.prototype.toHTML = function() {
      return startTagHTML(this.name, this.attrs) + toHTML(this.content) + endTagHTML(this.name);
    };
    return Tag;
  })();
  VoidTag = (function() {
    function VoidTag(name, attrs) {
      this.name = name;
      this.attrs = attrs;
    }
    VoidTag.prototype.toHTML = function() {
      return startTagHTML(this.name, this.attrs);
    };
    return VoidTag;
  })();
  Template = (function() {
    function Template(doctype, tagFn) {
      this.doctype = doctype;
      this.tagFn = tagFn;
    }
    Template.prototype.compile = function(params) {
      return this.doctype + toHTML(this.tagFn(params));
    };
    return Template;
  })();
  /*
  	Function exports
  	================
  */
  exports.tag = tag = function() {
    var name, rest;
    name = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (rest.length === 0) {
      return new Tag(name, {}, '');
    }
    if (rest.length === 1) {
      if (typeOf(rest[0]) === 'object' && !(rest[0] instanceof Tag) && !(rest[0] instanceof VoidTag)) {
        return new Tag(name, rest[0], '');
      }
      return new Tag(name, {}, rest[0]);
    }
    if (rest.length === 2) {
      return new Tag(name, rest[0], rest[1]);
    }
  };
  exports.voidtag = voidtag = function(name, attrs) {
    if (attrs) {
      return new VoidTag(name, attrs);
    }
    return new VoidTag(name, {});
  };
  exports.doctype = function(value) {
    if (value === 5) {
      return '<!DOCTYPE HTML>';
    }
    return '';
  };
  exports.template = function(doctype, content) {
    if (typeOf(content) === 'function') {
      return new Template(doctype, content);
    }
    return new Template(doctype, function(params) {
      return content;
    });
  };
  normalTags = ['a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bb', 'bdo', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'datagrid', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd', 'label', 'legend', 'li', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 'samp', 'script', 'section', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'ul', 'var', 'video'];
  voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'];
  exportTag = function(tagname) {
    return exports[tagname] = function() {
      var rest;
      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return tag.apply(null, [tagname].concat(__slice.call(rest)));
    };
  };
  exportVoidTag = function(tagname) {
    return exports[tagname] = function() {
      var rest;
      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return voidtag.apply(null, [tagname].concat(__slice.call(rest)));
    };
  };
  for (_i = 0, _len = normalTags.length; _i < _len; _i++) {
    ntag = normalTags[_i];
    exportTag(ntag);
  }
  for (_j = 0, _len2 = voidTags.length; _j < _len2; _j++) {
    vtag = voidTags[_j];
    exportVoidTag(vtag);
  }
}).call(this);
