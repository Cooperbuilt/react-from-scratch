/**
 * Render Spec
 *
 * @author Evan Cooper
 */
import { render } from "../render";
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const dom = new JSDOM('<!DOCTYPE html><head/><body></body>')
global.window = dom.window
global.document = window.document
global.navigator = window.navigator

const ELEMENT = {
  type: "div",
  props: {
    children: [{ type: "input", props: {} }]
  }
};

const anonJestFn = jest.fn()

const ELEMENT_WITH_PROPS = {
  type: "div",
  props: {
    id: "container",
    children: [
      {
        type: "input",
        props: {
          value: "foo",
          type: "text",
          class: "input",
          onClick: anonJestFn
        }
      },
      {
        type: "a",
        props: {
          href: "/bar",
          children: [{
            type: "TEXT ELEMENT",
            props: { nodeValue: "Foo" }
          }]
        }
      }
    ]
  }
};
const ELEMENT_WITH_CUSTOM_PROPS = {
  type: "div",
  props: {
    id: "container",
    children: [
      {
        type: "input",
        props: { "data-enzyme-id": "inputElement", type: "text" }
      }
    ]
  }
};

describe("Render function", () => {
  let parentNode;
  beforeAll(() => {
    let div = document.createElement("div");
    div.setAttribute("class", "root");
    document.body.appendChild(div);
    parentNode = document.querySelector(".root");
  });

  it("appends an element, including it's children, to the dom", () => {
    render(ELEMENT, parentNode);
    expect(document.querySelector("div").innerHTML).toEqual(
      "<div><input></div>"
    );
  });
  it("appends an element and adds props, listeners, and text nodes", () => {
    render(ELEMENT_WITH_PROPS, parentNode);
    document.querySelector(".input").click()
    expect(anonJestFn).toHaveBeenCalled()
    expect(document.querySelector("div").innerHTML).toBe(
      "<div><input></div><div id=\"container\"><input value=\"foo\" type=\"text\" class=\"input\"><a href=\"/bar\">Foo</a></div>"
    );
  });
});
