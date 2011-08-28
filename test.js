// smoke test

var s = require('./index.js');

// helpers
var testNumber = function(number) {
	console.log("TEST " + number.toString() + "\n========================================");
};
var testOutput = function(bloop) {
	console.log(bloop + '\n');
};


// FIRST TEST
(function() {
	testNumber(1);
	testOutput(s.tag('h1', {'class': 'fish-sticks'}, 'hola').toHTML());
}());

// SSSSSECOND
(function() {
	testNumber(2);
	var nested = s.tag('p', 'hola');
	var outer = s.tag('div', {'class': 'outer'}, nested);
	testOutput(outer.toHTML());
}());

// THIRD
(function() {
	testNumber(3);
	var h1 = s.h1('bam');
	var div = s.div(h1);
	testOutput(div.toHTML());
}());

// 4SQ
(function() {
	testNumber(4);
	var p1 = s.p('first');
	var p2 = s.p('second');
	var container = s.div({'class': 'container'}, [p1, p2]);
	testOutput(container.toHTML());
}());

// FiF
(function() {
	testNumber(5);
	var template = s.html([
		
		// airhead
		s.head(),
		
		// what a body, though
		s.body({'class': 'temple'}, [
			
			// BAM. navigation.
			s.div({'class': 'nav'}, [
				s.ul([
					s.li('nav1'),
					s.li('nav2')
				])
			]),
			
			// this here's the main section
			s.div({'class': 'main-section'}, [
				s.p('yup')
			]),
			
			// this is the footer (it is also empty)
			s.footer()
		])
	]);
	testOutput(template.toHTML());
}());

// 6
(function() {
	testNumber(6);
	var params = { yes: true };
	var maybe = function() {
		if(params.yes)
			return s.p('yes');
		return s.p('no');
	};
	testOutput(s.div([
		s.p('is this thing on?????'),
		maybe
	]).toHTML());
}());

// lucky
(function() {
	testNumber(7);
	var params = { yes: false };
	var p = s.p({'id': 'should-not-be-yes'}, function() {
		if(params.yes)
			return "yes";
		return "i dunno man";
	});
	testOutput(s.div([
		s.p('are you sure?????'),
		p
	]).toHTML());
}());

// test 8
(function() {
	testNumber(8);
	var template = s.template(s.doctype(5), function(params) {
		return s.html([
			s.head([
				s.meta({charset: 'utf-8'}),
				s.title('title')
			]),
			s.body([
				s.div({'class':'container'})
			])
		])
	});
	testOutput(template.compile({}));
}());

// test 9
(function() {
	testNumber(9);
	var template = s.template(s.doctype(5), function(params) {
		return s.html([
			s.head([
				s.meta({ charset: 'utf-8' }),
				s.title(params.title)
			]),
			s.body([
				s.h1(params.title),
				s.h2(function() {
					if(params.dumbledore)
						return 'WIZARDROUS';
					return 'THIS IS HORRIFYING AND I NEVER MEANT IT TO HAPPEN.';
				}),
				s.div({ class: 'container' }, [
					s.code('...'),
					s.p('Outputs:'),
					s.code('...')
				])
			])
		])
	});

	testOutput(template.compile({ title: 'HTML SOURCERY', dumbledore: true }));
}());