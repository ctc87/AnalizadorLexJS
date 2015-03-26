var assert = chai.assert;

suite('Analizador Lexico de un subconjunto', function() {

  setup(function(){
    if (typeof __html__ !== 'undefined') {
      document.body.innerHTML = __html__['test/index.html'];
      input = document.getElementById('INPUT');
      ouput = document.getElementById('OUTPUT');
    }
  });
  
  test('Declaración de variable.', function() {
    INPUT.value = 'var hola = "holaMundo";';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "hola",\n        "arity": "name"\n    },\n    "second": {\n        "value": "holaMundo",\n        "arity": "literal"\n    }\n}');
  });
  
  test('Analizando una function.', function() {
    INPUT.value = 'var b = function(x) {\n   return 1;\n};';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "b",\n        "arity": "name"\n    },\n    "second": {\n        "value": "function",\n        "arity": "function",\n        "first": [\n            {\n                "value": "x",\n                "arity": "name"\n            }\n        ],\n        "second": {\n            "value": "return",\n            "arity": "statement",\n            "first": {\n                "value": 1,\n                "arity": "literal"\n            }\n        }\n    }\n}');
  });
  
    test('Drag&Drop', function() {
  	var test = [];
  	var test = {
  	  files: test
  	}
  	var style_ = {
  		background: ""
  	}
  	var target_ = {
  		style: style_
  	}
  	var fakeEvent = {
  		stopPropagation: function(){},
  		preventDefault: function(){},
  		dataTransfer: test,
  		target: target_
  	}
    handleFileSelect(fakeEvent);
  });
});
