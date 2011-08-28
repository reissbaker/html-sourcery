vows = require 'vows'
assert = require 'assert'
src = require '../index'

vows.describe('HTML Sourcery').addBatch(
	'Tags':
	
		'that are normal': 
		
			'and empty':
				topic: src.tag('h1')
				'should close with a closing tag, and not self-close': (topic) ->
					assert.equal topic.compile(), '<h1></h1>'
			
			'and have attributes passed':
				topic: src.tag('h1', {'class': 'merlin'})
				'should create tags with attributes': (topic) ->
					assert.match topic.compile(), /<h1 class="merlin">/
				'and should not self-close': (topic) ->
					assert.match topic.compile(), new RegExp('<h1 .+?></h1>')
		
			'and have content':
			
				'and the content is made from tags':
					'and the tag itself has no attributes':
						topic: src.tag('h1', src.tag('p'))
						'should wrap the inner content': (topic) ->
							assert.equal topic.compile(), '<h1><p></p></h1>'
					'and the tag itself has attributes':
						topic: src.tag('h1', {'class': 'strega-nona'}, src.tag('p'))
						'should have attributes and wrap the inner content': (topic) ->
							assert.equal topic.compile(), '<h1 class="strega-nona"><p></p></h1>'
				
				'and the content is made from a function':
					'which has no parameters':
						topic: src.tag('h1', (params) ->
							src.tag('p')
						)
						'should compile correctly': (topic) ->
							assert.equal topic.compile(), '<h1><p></p></h1>'
					
					'which has parameters':
						topic: src.tag('h1', (params) ->
							src.tag(params.tagtype)
						)
						'should compile correctly, when compiled with correct parameters': (topic) ->
							assert.equal topic.compile(tagtype:'p'), '<h1><p></p></h1>'
		
		
		'that are void':
		
			'and have no attributes':
				topic: src.voidtag('br')
				'should not self-close, and shouldn\'t have a closing tag': (topic) ->
					assert.equal topic.compile(), '<br>'
			
			'and have attributes passed':
				topic: src.voidtag('br', {'class': 'gandalf'})
				'should create HTML with attributes': (topic) ->
					assert.equal topic.compile(), '<br class="gandalf">'
				'and should not self-close, and shouldn\'t have closing tags': (topic) ->
					assert.isFalse new RegExp('/').test(topic.compile())
						
				
	'Compilation':
	
		'with all optional arguments passed':
		
			'should accept tags':
				topic: src.compile(src.doctype(5), {}, src.tag('h1'))
				'and pass': (topic) ->
					assert.equal topic, (src.doctype(5) + '<h1></h1>')
			
			'should accept functions':
				topic: src.compile(src.doctype(5), {}, (params) ->
					src.tag('h1')
				)
				'and pass': (topic) ->
					assert.equal topic, (src.doctype(5) + '<h1></h1>')
			
			'should accept strings':
				topic: src.compile(src.doctype(5), {}, '<h1></h1>')
				'and pass': (topic) ->
					assert.equal topic, (src.doctype(5) + '<h1></h1>')
		
		'without all optional arguments passed':
			
			'but with the doctype and the content':
				topic: src.compile(src.doctype(5), src.tag('html'))
				'should compile': (topic) ->
					assert.equal topic, (src.doctype(5) + '<html></html>')
			
			'but with the parameters and the content':
				topic: src.compile({}, src.tag('html'))
				'should compile with a default HTML5 doctype': (topic) ->
					assert.equal topic, (src.doctype(5) + '<html></html>')
			
			'and with only the content':
				topic: src.compile(src.tag('html'))
				'should compile with a default HTML5 doctype': (topic) ->
					assert.equal topic, (src.doctype(5) + '<html></html>')
			
).run()