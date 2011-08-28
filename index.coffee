###
	Utility functions.
	==================
###

# returns true if the object is an array
isArray = (value) ->
	s = typeof value
	if s == 'object' && value && value instanceof Array
		return true
	return false

# returns the 'correct' type of an object -- exactly the
# same as typeof operator, except it returns 'array' for
# native arrays.
typeOf = (value) ->
	if isArray(value)
		return 'array'
	return typeof value

###
	HTML conversion.
	================
###

# converts stuff to HTML.
compile = (content, params) ->
	if typeOf(content) == 'array'
		allContent = ''
		allContent += compile(entity, params) for entity in content
		return allContent
	if typeOf(content) == 'function'
		return compile content(params)
	if typeOf(content) == 'string'
		return content
	return content.compile(params)


###
	helper functions
	----------------
###
# converts attributes to html
attrsToHTML = (attrs) ->
	attrsString = ''
	for property of attrs
		attrsString += "#{property}=\"#{attrs[property]}\" " if attrs.hasOwnProperty property
	if attrsString.length > 0
		attrsString = attrsString.substring 0, attrsString.length - 1
	attrsString

# creates an HTML opening tag
startTagHTML = (name, attrs) ->
	attrsHTML = attrsToHTML attrs
	if attrsHTML.length > 0
		"<#{name} #{attrsHTML}>"
	else
		"<#{name}>"
# creates an HTML close tag
endTagHTML = (name) ->
	"</#{name}>"

###
	classes
	-------
###

# normal tag
class Tag
	constructor: (@name, @attrs, @content) ->
	compile: (params) ->
		startTagHTML(@name, @attrs) + compile(@content, params) + endTagHTML(@name)

# void tag
class VoidTag
	constructor: (@name, @attrs) ->
	compile: (params) ->
		startTagHTML(@name, @attrs)

###
	Function exports
	================
###	
# creates a normal tag
exports.tag = tag = (name, rest...) ->
	if rest.length == 0
		return new Tag name, {}, ''
	if rest.length == 1
		if typeOf(rest[0]) == 'object' && !(rest[0] instanceof Tag) && !(rest[0] instanceof VoidTag)
			return new Tag name, rest[0], ''
		return new Tag name, {}, rest[0]
	if rest.length == 2
		return new Tag name, rest[0], rest[1]

# creates a void tag
exports.voidtag = voidtag = (name, attrs) ->
	if attrs
		return new VoidTag name, attrs
	return new VoidTag name, {}

# creates doctypes (only works with HTML5 currently!)
exports.doctype = (value) ->
	return '<!DOCTYPE HTML>' if value == 5
	return ''

# compiles templates
exports.compile = (rest...) ->
	params = {}
	doctype = ''
	content = null
	if rest.length == 3
		doctype = rest[0]
		params = rest[1]
		content = rest[2]
	else if rest.length == 2
		if typeOf(rest[0]) == 'string'
			doctype = rest[0]
		else
			doctype = exports.doctype(5)
			params = rest[0]
		content = rest[1]
	else
		doctype = exports.doctype(5)
		content = rest[0]
	
	return doctype + compile(content, params)

# throw in some sugar for creating most HTML tags
normalTags = [
	'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bb', 'bdo', 'blockquote', 'body',
	'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'datagrid', 'datalist', 'dd', 'del',
	'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'fieldset', 'figure', 'footer', 'form',
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd',
	'label', 'legend', 'li', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol',
	'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 'samp', 
	'script', 'section', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'table',
	'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'ul', 'var', 'video'
]
voidTags = [
	'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param',
	'source'
]

exportTag = (tagname) ->
	exports[tagname] = (rest...) ->
		tag tagname, rest...
exportVoidTag = (tagname) ->
	exports[tagname] = (rest...) ->
		voidtag tagname, rest...

exportTag(ntag) for ntag in normalTags
exportVoidTag(vtag) for vtag in voidTags