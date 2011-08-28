var src, template;
src = require('../index');
template = src.html([
  src.head([
    src.meta({
      charset: 'utf-8'
    }), src.title(function(params) {
      return params.title;
    })
  ]), src.body([
    src.h1(function(params) {
      return params.title;
    }), src.div({
      'class': 'container'
    }, [
      src.p('A pure-Javascript library for conjuring up HTML, meant for use with node. Observe:'), src.code('...'), src.p('Outputs:'), src.code('...'), 'Which, by the way, is valid HTML5. No self-closing tags here.', function(params) {
        if (params.dumbledore) {
          return 'Wizardrous';
        }
        return 'oh god how did this get in here i am not good with witchcraft';
      }
    ]), src.footer()
  ])
]);
console.log(src.compile(src.doctype(5), {
  title: 'HTML SOURCERY',
  dumbledore: true
}, template));