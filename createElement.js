/**
* create element function
*/

/**
* This creates an object representing a dom node,
* @method render
* @param {string} type this is the element type (i.e "div", "span" etc.)
* @param {Object} props object representing all element props (i.e class, id, href, etc.)
* @param {Object} TODO <= fix this
* @return {object}
*/

const TEXT_ELEMENT = "TEXT ELEMENT";

export const createElement = (type, config, ...rest) => {
  const props = Object.assign({}, config);
  if (rest.length) {
    props.children = rest
    .filter(maybeChild => maybeChild != null && maybeChild !== false)
    .map(child => child instanceof Object ? child : createTextElement(child));  
  }
  return { type, props };
}

const createTextElement = (value) => {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}