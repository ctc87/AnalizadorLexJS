'use strict';
// tokens.js
// 2015-02-25


// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments are ignored.

RegExp.prototype.bExec = function(str) {
    var lastIndex = this.lastIndex;     // Last charcater in last exec regexp
    var exec = this.exec(str);          // Exec function in str
    if(exec && exec.index == lastIndex) // if exec function and the first character of exec and last character in the last exec iths the same
        return exec;
    return null;
}

String.prototype.tokens = function () {
    var startIndex;             // The index of the start of the token.
    var currentTokenIndex = 0;      // The index of the current character.
    var numberValue             // The number Value
    var matching                // Matching
    var result = [];            // An array to hold the results.

    // the following lines are the regexp of the different tokens of js
    var WHITES              = /\s+/g;                                               // White spaces
    var ID                  = /[a-zA-Z_]\w*/g;                                      // Var identificator
    var NUM                 = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;                    // Number constant objects
    var STRING              = /('(\\.|[^'])*'|"(\\.|[^"])*")/g;                     // String constant objects
    var ONELINECOMMENT      = /\/\/.*/g;1                                           // Comments in one line
    var MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//g;                                // Comments in serveral lines
    // May be some character is missing?
    var TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g;// Operators with two or three characters
    var ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]])/g;                          // Operators with oe character
    var tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT, 
                  MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS ];        // Array of tokens regexps

// function to make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: startIndex,
            to: currentTokenIndex
        };
    };


    var getTok = function() {
      var str = matching[0];
      currentTokenIndex += str.length; // Warning! side effect on currentTokenIndex
      return str;
    };


// Begin tokenization. If the source string is empty, return nothing.
    if (!this) {
        return;
    }

    while(currentTokenIndex < this.length) {    // while final token index its the final index of string 
        tokens.forEach(function(t) {t.lastIndex = currentTokenIndex;}); //Only ECMAScript5
        startIndex = currentTokenIndex;
        // Ignore whitespaces and comments
        if((matching = WHITES.bexec(this)) || 
        (matching = ONELINECOMMENT.bExec(this)) || 
        (matching = MULTIPLELINECOMMENT.bExec(this))) {
            getTok();                                               //update the index
        }
        // Var names tokenization
        else if(matching = ID.bexec(this)) {
            result.push(make('name', getTok()));                    //push the result into result array with name and the token string matched
        }
        // Constant number objects tokenization
        else if(macthing = NUM.bexec(this)) {
            numberValue = +getTok();
            
            if(isFinite(numberValue)) {
                result.push(make('number', numberValue));           // If is finite we proced like var name.
            } else {
                make('number', macthing[0]).error("Bad number");    // Else ???? see in execution to describe it
            }
        }
        // Constant string objects tokenization
        else if(matching = STRING.bexec(this)) {                    // Push the result into result array, and put off the quotes in result type field 
            result.push(make('string', getTok().replace(/^["']|["']$/g,''))); 
        }
        // Two char operators tokenization
        else if(matching = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        }
        // One char operators tokenization
        else if(matching = ONECHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        }
        else {
            throw "Syntax error near '" + this.substr(currentTokenIndex) + "'";
        }
    }
    return result;
};




