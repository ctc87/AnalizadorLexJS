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
  
  
    test('Prueba drop', function() {
  	var test = [];
  	//var aFileParts = ['var a = 2;'];
		//var oMyBlob = new Blob(aFileParts, {type : 'text/plain'});
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
    //INPUT.value = 'var a = $';
    //main();
    //assert.deepEqual(OUTPUT.innerHTML, '"Syntax error near \'$\'"');
  });
});