/**
 * Render Methods 
 */


/**
* This renders an element to the dom
* @method render
* @param {object} element this is the element to render
* @param {Object} parentDom A dom object
* @return {void} executes a side effect
*/

export function render(element, parentDom) {
  const {type, props} = element;
  const dom = document.createElement(type)
  const childElements = props.children || [];
  childElements.forEach(childElement => render(childElement, dom));
  parentDom.appendChild(dom);
}




