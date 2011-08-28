HTML SOURCERY
=============
A pure-Javascript library for conjuring up HTML, meant for use with node. Observe:

```javascript
src = require('./html-sourcery');

var template = src.template(src.doctype(5), src.html([
	src.head([
		src.meta({ charset: 'utf-8' }),
		src.title(function(params) { return params.title; })
	]),
	src.body([
		src.h1(function(params) { return params.title; }),
		src.div({ class: 'container' }, [
			src.p('A pure-Javascript library for conjuring up HTML, meant for use with node. Observe:'),
			src.code('...'),
			src.p('Outputs:'),
			src.code('...'),
			src.p('Which, by the way, is valid HTML5. No self-closing tags here.'),
			function(params) {
				if(params.dumbledore)
					return src.p('Wizardrous.');
				return src.h1('oh god how did this get in here i am not good with witchcraft');
			}
		]),
		// empty footer
		src.footer()
	])
]));

console.log(template.compile({ title: 'HTML SOURCERY', dumbledore: true }));
```

Outputs:

```html
<!DOCTYPE HTML><html><head><meta charset="utf-8"><title>HTML SOURCERY</title></head><body><h1>HTML SOURCERY</h1><div class="container"><code>...</code><p>Outputs:</p><code>...</code><p>Which, by the way, is valid HTML5. No self-closing tags here.</p><p>Wizardrous.</p></div><footer></footer></body></html>
```

Which, by the way, is valid HTML5. No self-closing tags here.

Wizardrous.

WHY
---
Data as code, code as data. Templating languages like to mix underpowered data formats with syntax-heavy games of Twister, and refuse to let you ```require``` in code you've already written. To quote a [wise rant](https://sites.google.com/site/steveyegge2/the-emacs-problem): 

> I know, I know — everyone raves about the power of separating your code and your data . . . But it's [not] what you really want, or all the creepy half-languages wouldn't all evolve towards being Turing-complete, would they?

HOW
---
Install:
```npm install html-sourcery```

### Tags
(Nearly) everything in HTML Sourcery is based around the concept of tags. Tags work as follows:
* ```src.tag(name, [attrs], [content])``` creates tags, where name is a string corresponding to the name of an HTML tag ("div", for example), attrs is an optional object that maps html attributes to html attribute values ({'class': 'eye-of-newt'}, for example), and content is an optional valid HTML string, tag, function that returns a string or tag, or an array of strings, tags, and/or functions.
* ```tag.toHTML(params)```, where params is an object. The ```params``` object gets passed to any functions inside the tag's child-content, so that tags and tag content can be generated dynamically.

Not all HTML tags are the same, though: some are considered "void," and can't contain child elements. Void tags are created as follows:
* ```src.voidtag(name, [attrs])```. 

Except for the fact that void tags can't contain child content, usage of both types of tags is exactly the same. However, when void tags are compiled, they will not self-close, so as to differentiate the content as being HTML and not XHTML.

For convenience, all legal HTML5 tags are already defined in HTML Sourcery as wrapper functions to tag or voidtag. For example, to create a div tag, you can just use the following function: 
* ```src.div([attrs], [content])```, instead of the more verbose: ```src.tag('div', [attrs], [content])```.

### Templates
All tags are organized into templates. Templates work as follows:
* ```src.template(doctype, content)``` creates templates, where doctype is a valid HTML doctype string, and content is a either a tag or a function that returns a tag (realistically, it should either be the 'html' tag or a function that returns the 'html' tag). 
* ```template.compile(params)``` compiles templates into HTML strings, where params is an Object that gets passed to the template's child tags' ```toHTML()``` function.

For convenience, a function to generate valid Doctypes is also defined. It works as follows:
* ```src.doctype(version)```, where version is a number representing a version of HTML. Only HTML5 is currently supported, which means that the only valid usage of the ```doctype``` function is ```src.doctype(5)```.

FAQ
---
> Can I use it?

Yes! Please.

> Does it support anything except HTML5?

Um. Well. Next week? Maybe.

> Can I use it without node?

I don't know!

TODO
----
* Pretty printing

CREDITS
-------
[CoffeeKup](http://coffeekup.org/) was like, a huge inspiration.