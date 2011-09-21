(function() {
  /*
  	Utility functions.
  	==================
  */
  var Tag, VoidTag, attrsToHTML, compile, endTagHTML, exportTag, exportVoidTag, isArray, normalTags, ntag, root, startTagHTML, tag, typeOf, voidTags, voidtag, vtag, _i, _j, _len, _len2;
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
  compile = function(content, params) {
    var allContent, entity, _i, _len;
    if (typeOf(content) === 'array') {
      allContent = '';
      for (_i = 0, _len = content.length; _i < _len; _i++) {
        entity = content[_i];
        allContent += compile(entity, params);
      }
      return allContent;
    }
    if (typeOf(content) === 'function') {
      return compile(content(params));
    }
    if (typeOf(content) === 'string') {
      return content;
    }
    return content.compile(params);
  };
  /*
  	helper functions
  	----------------
  */
  attrsToHTML = function(attrs) {
    var attrsString, property;
    attrsString = '';
    for (property in attrs) {
      if (attrs.hasOwnProperty(property)) {
        attrsString += "" + property + "=\"" + attrs[property] + "\" ";
      }
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
    Tag.prototype.compile = function(params) {
      return startTagHTML(this.name, this.attrs) + compile(this.content, params) + endTagHTML(this.name);
    };
    return Tag;
  })();
  VoidTag = (function() {
    function VoidTag(name, attrs) {
      this.name = name;
      this.attrs = attrs;
    }
    VoidTag.prototype.compile = function(params) {
      return startTagHTML(this.name, this.attrs);
    };
    return VoidTag;
  })();
  /*
  	Function root
  	================
  */
  if (typeof exports !== 'undefined') {
    root = exports;
  } else {
    root = this.htmlSourcery = {};
  }
  root.tag = tag = function() {
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
  root.voidtag = voidtag = function(name, attrs) {
    if (attrs) {
      return new VoidTag(name, attrs);
    }
    return new VoidTag(name, {});
  };
  root.doctype = function(value) {
    if (value === 5) {
      return '<!DOCTYPE HTML>';
    }
    return '';
  };
  root.compile = function() {
    var content, doctype, params, rest;
    rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    params = {};
    doctype = '';
    content = null;
    if (rest.length === 3) {
      doctype = rest[0];
      params = rest[1];
      content = rest[2];
    } else if (rest.length === 2) {
      if (typeOf(rest[0]) === 'string') {
        doctype = rest[0];
      } else {
        doctype = root.doctype(5);
        params = rest[0];
      }
      content = rest[1];
    } else {
      doctype = root.doctype(5);
      content = rest[0];
    }
    return doctype + compile(content, params);
  };
  normalTags = ['a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bb', 'bdo', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'datagrid', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd', 'label', 'legend', 'li', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 'samp', 'script', 'section', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'ul', 'var', 'video'];
  voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'];
  exportTag = function(tagname) {
    return root[tagname] = function() {
      var rest;
      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return tag.apply(null, [tagname].concat(__slice.call(rest)));
    };
  };
  exportVoidTag = function(tagname) {
    return root[tagname] = function() {
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
