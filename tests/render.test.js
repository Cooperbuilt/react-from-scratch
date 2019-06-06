/**
 * Render Spec
 *
 * @author Evan Cooper
 */
import { render } from "../render";

const ELEMENT = {
  type: "div",
  props: {
    children: [{ type: "input", props: {} }]
  }
};

const ELEMENT_WITH_PROPS = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
      {
        type: "a",
        props: {
          href: "/bar",
          onClick: e => {
            console.log(e);
          }
        }
      },
      {
        type: "span",
        props: {
          children: [
            {
              type: "TEXT ELEMENT",
              props: { nodeValue: "Foo" }
            }
          ]
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
  beforeAll(() => {
    let div = document.createElement("div");
    div.setAttribute("class", "root");
    document.body.appendChild(div);
  });

  it("appends an element, including it's children, to the dom", () => {
    const parentNode = document.querySelector(".root");
    render(ELEMENT, parentNode);
    expect(document.querySelector("div").innerHTML).toEqual(
      "<div><input></div>"
    );
  });
  it("appends an element and adds props and listeners", () => {
    const parentNode = document.querySelector(".root");
    render(ELEMENT_WITH_PROPS, parentNode);
    expect(document.querySelector("div").innerHTML).toBe(
      '<div><input></div><div id=\"container\"><input value=\"foo\" type=\"text\"><a href=\"/bar\"></a><span></span></div>'
    );
  });
});
