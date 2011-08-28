HTML SOURCERY
=============
A pure-Javascript library for conjuring up HTML, meant for use with node. Observe:

```javascript
src = require('html-sourcery');

console.log(src.compile(src.doctype(5), { title: 'HTML SOURCERY', dumbledore: true }, src.html([
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
])));
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

HTML Sourcery isn't a templating language: it's a templating _library_, and that makes all the difference. Source files are just .js files, and you can ```require``` away at will.

HOW
---
Install:
```npm install html-sourcery```

To run the test suite, first you have to install Vows: ```npm install vows```

### Tags
(Nearly) everything in HTML Sourcery is based around the concept of tags. Tags work as follows:

* ```src.tag(name, [attrs], [content])``` creates tags, where name is a string corresponding to the name of an HTML tag ("div", for example), attrs is an optional object that maps html attributes to html attribute values ({'class': 'eye-of-newt'}, for example), and content is an optional valid HTML string, tag, function that returns a string or tag, or an array of strings, tags, and/or functions.
* ```tag.compile(params)```, where params is an object. The ```params``` object gets passed to any functions inside the tag's child-content, so that tags and tag content can be generated dynamically.

Not all HTML tags are the same, though: some are considered "void," and can't contain child elements. Void tags are created as follows:

* ```src.voidtag(name, [attrs])```. 

Except for the fact that void tags can't contain child content, usage of both types of tags is exactly the same. However, when void tags are compiled, they will not self-close, so as to differentiate the content as being HTML and not XHTML.

For convenience, all legal HTML5 tags are already defined in HTML Sourcery as wrapper functions to tag or voidtag. For example, to create a div tag, you can just use the following function: 

* ```src.div([attrs], [content])```, instead of the more verbose: ```src.tag('div', [attrs], [content])```.

### Compiling Tags
Tags can easily be compiled to valid HTML using HTML Sourcery's ```compile``` function:

* ```src.compile([doctype], [params], content)``` compiles templates into HTML strings, where doctype is an optional valid HTML Doctype string (if it isn't provided, the default HTML5 Doctype will be used), params is an optional Object that gets passed to the template's content's ```compile``` function.

Compiling using only the ```tag.compile``` functions instead of the ```src.compile``` function allows you to generate cached partials of the HTML content you want to serve. However, you do need to eventually use the ```src.compile``` function -- otherwise your HTML will lack a Doctype and be invalid.

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
* Comments
* Possibly split the compilation stage into two steps: generate, and compile. Generation leaves you with a full tag tree (no functions), and compilation gives you the HTML strings. Generation is useful because it lets you easily traverse (and possibly manipulate) the tree. Some gotchas, though: the "tree" doesn't only contain tags -- it also may contain valid HTML strings, like ```"hello <a href='http://www.example.com'>link</a>"```.

CREDITS
-------
[CoffeeKup](http://coffeekup.org/) was like, a huge inspiration.
