var assert = chai.assert;


	
suite('Analizador Lexico de un subconjunto', function() {

  setup(function(){
    if (typeof __html__ !== 'undefined') {
      document.body.innerHTML = __html__['public/tests/index.html'];
      output = document.getElementById('OUTPUT');
      input = document.getElementById("INPUT");
    }
  });
  
  test('Declaración de variable.', function() {
    input.value = 'var hola = "holaMundo";';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "hola",\n        "arity": "name"\n    },\n    "second": {\n        "value": "holaMundo",\n        "arity": "literal"\n    }\n}');
  });
  
  test('Analizando una function.', function() {
    input.value = 'var b = function(x) {\n   return 1;\n};';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "b",\n        "arity": "name"\n    },\n    "second": {\n        "value": "function",\n        "arity": "function",\n        "first": [\n            {\n                "value": "x",\n                "arity": "name"\n            }\n        ],\n        "second": {\n            "value": "return",\n            "arity": "statement",\n            "first": {\n                "value": 1,\n                "arity": "literal"\n            }\n        }\n    }\n}');
  });
  
  test('Probando variables numericas.', function() {
    input.value = 'var num = 5 * 2;';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "num",\n        "arity": "name"\n    },\n    "second": {\n        "value": "*",\n        "arity": "binary",\n        "first": {\n            "value": 5,\n            "arity": "literal"\n        },\n        "second": {\n            "value": 2,\n            "arity": "literal"\n        }\n    }\n}');
  });
  
  test('Probando un while.', function() {
    input.value = 'while (1 !== 0) {}';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "while",\n    "arity": "statement",\n    "first": {\n        "value": "!==",\n        "arity": "binary",\n        "first": {\n            "value": 1,\n            "arity": "literal"\n        },\n        "second": {\n            "value": 0,\n            "arity": "literal"\n        }\n    },\n    "second": null\n}');
  });
  
    test('Probando if else.', function() {
    input.value = 'if (0 <= 1) {}';
    main();
    assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "if",\n    "arity": "statement",\n    "first": {\n        "value": "&lt;=",\n        "arity": "binary",\n        "first": {\n            "value": 0,\n            "arity": "literal"\n        },\n        "second": {\n            "value": 1,\n            "arity": "literal"\n        }\n    },\n    "second": null,\n    "third": null\n}');
  });
  
});
