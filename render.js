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

const ELEMENT_NODE_TYPE = 1
const TEXT_NODE_TYPE = 3

export function render(element, parentDom) {
  const { type, props } = element;

  // Create the DOM element
  const isTextElement = type == "TEXT ELEMENT";
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  // Add event listeners
  const isListener = name => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // Set Props only on HTML elements and skip text nodes
  if (dom.nodeType == ELEMENT_NODE_TYPE) {
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props)
      .filter(isAttribute)
      .forEach(name => {
        dom.setAttribute(name, props[name]);
      });
  }

  // Set the text element's node value type
  if (dom.nodeType == TEXT_NODE_TYPE) {
    dom['nodeValue'] = props['nodeValue']
  }

  // Render children
  const childElements = props.children || [];
  childElements.forEach(childElement => render(childElement, dom));

  // Append to parent
  parentDom.appendChild(dom);
}
