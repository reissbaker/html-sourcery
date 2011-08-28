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

(Nearly) everything in HTML Sourcery is based around the concept of tags. Tags have one method: ```tag.toHTML(params)```, where ```params``` is an Object. More on that later, as you'll see.

Tags are correspondant to HTML tags; to create a normal tag, simply call: ```src.tag(name, [attrs], [content])```, where attrs is an (optional) map of HTML attribute names and values, and content is either a string of valid HTML, a tag, a function that returns either a string of valid HTML or a tag, or an array of any of the previous data types. The tag itself is a parent to the content; for example, ```src.tag('div', src.tag('p', 'hello'))``` would compile to ```<div><p>hello</p></div>``` when the tag's ```toHTML(params)``` method was called. Each function is of the form: ```function(params)```, where ```params```, as mentioned earlier, is an Object. This is the reason that tags' ```toHTML``` functions take a ```params``` object: so that variables can be injected into the templates dynamically.

Not all HTML tags are the same, though: some are considered "void," and can't contain child elements. To create void tags, call: ```src.voidtag(name, [attrs])```. Except for the fact that void tags can't contain child content, usage of the tags are exactly the same. However, when void tags are compiled, they will not self-close (to differentiate the content as being HTML, and not XHTML).

For convenience, all legal HTML5 tags are already defined in HTML Sourcery as wrapper functions to tag or voidtag. For example, to create a div tag, you can just use the following function: ```src.div([attrs], [content])```, instead of the more verbose: ```src.tag('div', [attrs], [content])```.

All tags are organized into templates, using the ```src.template(doctype, content)``` function, where doctype is a valid doctype string, and content is a either a tag or a function that returns a tag (realistically, it should either be the 'html' tag or a function that returns the 'html' tag). Templates have a single method: ```template.compile(params)```, where params is an Object, and which compiles the tags using it for each of the functions inside.

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