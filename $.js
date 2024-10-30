/* Sort of jQuery-ish:
- selects for data-<name> first
- if that fails, selects items via standard selector
- context is second arg and defaults to document as in jQuery
- defines functions text, html, outerHTML, get, index on the returned object
- returns value if the selected elements have one; an array of values if multiple elements selected, otherwise returns an object as in jQuery
*/

function $ (s, c = document) {
const hasValue = "input, select, textarea, output";

const nodeList = (s instanceof HTMLElement)? [s]
: c.querySelectorAll(`[data-name='${s}'], ${s}`);
//console.log("nodeList: ", nodeList);

return {
index (index) {
return index < nodeList.length? $(nodeList[index])
:null;
}, // index

get (index) {
return nodeList[index];
}, // $get

text (text) {
if (text) {
for (const node of nodeList) node.textContent = text;
} else if (nodeList.length > 0) {
return nodeList[0].textContent;
} // if

return this;
}, // text

attr: function (object) {
for (const node of nodeList){
for (const entry of Object.entries(object)) {
node.setAttribute(entry[0], entry[1]);
} // for
} // for

return this;
}, // attr

get value () {
return nodeList.length > 1? nodeList.map(node => node.value)
: nodeList.length === 1? nodeList[0].value
: undefined;
}, // get value

set: function set (value) {
nodeList.forEach((node, index) => {
const _value = value instanceof Array? value[index] : value;
node.matches(hasValue)?
node.value = _value : node.textContent = _value;
}); // forEach

return this;
} // set
}; // return
} // $
