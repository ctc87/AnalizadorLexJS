/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Transform a token object into an exception object and throw it.
//  http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
// Thanks Eliasib for pointing the error



        


  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
    
    evt.target.style.background = "none";


    // files is a FileList of File objects. List some properties.
    var ulnode=document.createElement("UL");
    for (var i = 0, f; f = files[i]; i++) {
        
        if (files[i]) {
            var reader = new FileReader();
            reader.onload = function(e) { 
                console.log(e.target.result);
                var textFileNode=document.createTextNode(e.target.result);
                document.getElementById('INPUT').appendChild(textFileNode);
            }
            var c = reader.readAsText(files[i]);
        }
        else { alert("Failed to load file"); }
        var linode=document.createElement("LI");
        var stronode=document.createElement("strong");
        var textStrnode=document.createTextNode(escape(f.name));
        var textnode=document.createTextNode(' ('  + f.type + ') - ' + f.size + ' bytes');
        stronode.appendChild(textStrnode);
        linode.appendChild(stronode);
        linode.appendChild(textnode);
        ulnode.appendChild(linode);
    }

    var list=document.getElementById("list");
    list.insertBefore(ulnode,list.childNodes[2]);
  }
  
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    if(evt.type == "dragover")
        evt.target.style.background = "green";
    else
        evt.target.style.background = "blue";
        
  }




// Check for the various File API support.
function VariosFuileSup() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }   
};


Object.constructor.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

function main() {
    var parse = make_parse();

    var source = document.getElementById('INPUT').value;
    var string, tree;
    try {
        tree = parse(source);
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }
    document.getElementById('OUTPUT').innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

window.onload = function() {
    VariosFuileSup();
      // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    document.getElementById('PARSE').onclick = main;
}
