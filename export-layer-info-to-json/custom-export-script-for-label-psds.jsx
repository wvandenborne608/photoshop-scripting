// Export Layer Coordinates - Adobe Photoshop Script
// Description: Export x and y coordinates
// Requirements: Adobe Photoshop CS6
// Version: 1.0, 2016-12-29
// Author: Wouter van den Borne
// ===============================================================================
// Installation:
// 1. Place script in
//        Mac: '~/Applications/Adobe Photoshop CS#/Presets/Scripts/'
//        Win: 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\'
// 2. Restart Photoshop
// 3. Choose File > Scripts > Export Layer Coordinates Photoshop
// ===============================================================================

// Enables double-click launching from the Mac Finder or Windows Explorer
#target photoshop 

// (array)object to JSON string implementation. eg JSON.stringify(dataArray) 
if(typeof JSON!=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());

// Bring application forward
app.bringToFront(); 

// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);

// Define pixels as unit of measurement
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

var FPath = Folder.selectDialog("Save exported coordinates to"); // Ask the user for the folder to export to
var dataArray = {}; //the main object to store the magic.

//get (path) coordinates as array.
function collectPathInfo (myDocument, thePath) {  
    var originalRulerUnits = app.preferences.rulerUnits;  
    app.preferences.rulerUnits = Units.POINTS;  
    var theArray = [];  
    for (var b = 0; b < thePath.subPathItems.length; b++) {  
        theArray[b] = [];  
        for (var c = 0; c < thePath.subPathItems[b].pathPoints.length; c++) {  
            var pointsNumber = thePath.subPathItems[b].pathPoints.length;  
            var theAnchor = thePath.subPathItems[b].pathPoints[c].anchor;  
            var theLeft = thePath.subPathItems[b].pathPoints[c].leftDirection;  
            var theRight = thePath.subPathItems[b].pathPoints[c].rightDirection;  
            var theKind = thePath.subPathItems[b].pathPoints[c].kind;  
            theArray[b][c] = [theAnchor, theLeft, theRight, theKind];  
        };  
        var theClose = thePath.subPathItems[b].closed;  
        theArray = theArray.concat(String(theClose))  
    };  
    app.preferences.rulerUnits = originalRulerUnits;  
    return theArray  
}; //end function

// Loop to iterate through all layers
function recurseLayers(currLayers, _dataArray) {
    for ( var i = 0; i < currLayers.layers.length; i++ ) {
        var layerRef = currLayers.layers[i];
        var item = {}; // temporary storage of (layer) item information.
        
        if (layerRef.name == "spot") { //if layer is a regular (image) layer (the spot)
           item = {
            "xPos": (layerRef.bounds[0].value + layerRef.bounds[2].value)/2,
            "yPos": (layerRef.bounds[1].value + layerRef.bounds[3].value)/2
            }
        } //end if
    
         if (layerRef.kind == LayerKind.TEXT) { //if layer is a text layer
          item = {
            "xPos": layerRef.bounds[0].value,
            "yPos": layerRef.bounds[1].value
            }
        } //end if
        
        if (layerRef.kind == LayerKind.SOLIDFILL) { //if layer is a shape (a line)
            docRef.activeLayer = layerRef; 
            var pathCoordinatesArray = collectPathInfo (docRef, docRef.pathItems[docRef.pathItems.length - 1] ); 
            collectPathInfo(docRef, docRef.pathItems[docRef.pathItems.length - 1]);
            item = {
                "xPosStart": pathCoordinatesArray[0][0][0][0],
                "yPosStart": pathCoordinatesArray[0][0][0][1],
                "xPosEnd": pathCoordinatesArray[0][3][0][0],
                "yPosEnd": pathCoordinatesArray[0][3][0][1],
            }
        } //end if

        _dataArray[layerRef.name] = item; //ad item to the data array
        
        if ((typeof currLayers.layers[i].layers !== 'undefined')  
            && (currLayers.layers[i].layers.length>0)) { //if layer is a layer set then, recursive loop through that node
            recurseLayers(currLayers.layers[i], _dataArray[layerRef.name]); 
        } //end if

    } //end forloop
}// end function

// Export to txt file
function writeFile(FPath, info, docName) {
    if ( $.os.search(/windows/i) !== -1 ) { // Detect line feed type
        fileLineFeed = "Windows";
    }
    else {
        fileLineFeed = "Macintosh";
    }    
    try {
        var f = new File(FPath + "/" + docName + ".txt");
        f.remove();
        f.open('a');
        f.lineFeed = fileLineFeed;
        f.write(info);
        f.close();
    }
    catch(e){}
} //end function


recurseLayers(docRef, dataArray); //start the magic
writeFile(FPath, JSON.stringify(dataArray), docName); //write the magic
preferences.rulerUnits = defaultRulerUnits; // Set preferences back to user 's defaults
