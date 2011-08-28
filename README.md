HTML SOURCERY
=============
A a pure-Javascript library for conjuring up HTML, meant for use with node. Observe:

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
<!DOCTYPE HTML><html><head><meta charset="utf-8"><title>HTML SOURCERY</title></head><body><h1>HTML SOURCERY</h1><h2>WIZARDROUS</h2><div class="container"><code>...</code><p>Outputs:</p><code>...</code></div><footer></footer></body></html>
```

Which, by the way, is valid HTML5. No self-closing tags here.

Wizardrous.

WHY
---
Data as code, code as data. Templating languages like to mix underpowered data formats with syntax-heavy games of Twister, and refuse to let you ```require``` in code you've already written. To quote a [wise man](https://sites.google.com/site/steveyegge2/the-emacs-problem): 

> I know, I know — everyone raves about the power of separating your code and your data . . . But it's [not] what you really want, or all the creepy half-languages wouldn't all evolve towards being Turing-complete, would they?

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