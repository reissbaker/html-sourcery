src = require '../index'

template = src.html [
		src.head [
			src.meta charset: 'utf-8'
			src.title (params) -> params.title
		]
		src.body [
			src.h1 (params) -> params.title
			src.div { 'class': 'container' }, [
				src.p 'A pure-Javascript library for conjuring up HTML, meant for use with node. Observe:'
				src.code '...'
				src.p 'Outputs:'
				src.code '...'
				'Which, by the way, is valid HTML5. No self-closing tags here.'
				(params) ->
					return 'Wizardrous' if params.dumbledore
					return 'oh god how did this get in here i am not good with witchcraft'
			]
			
			# empty footer
			src.footer()
		]
	]

console.log(src.compile src.doctype(5), { title:'HTML SOURCERY', dumbledore: true }, template)