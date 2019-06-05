/**
 * Render Spec
 *
 * @author Evan Cooper
 */
import { render } from "../render";

const ELEMENT = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
    ]
  }
};

describe("Render function", () => {
  beforeAll(() => {
    Object.defineProperty(global, "document", {});
  });
  it("appends an element, including it's children, to the dom", () => {
    var div = document.createElement("div");
    div.setAttribute("class", "root");
    document.body.appendChild(div);
    const parentNode = document.querySelector('.root')
    render(ELEMENT, parentNode);
    expect(document.querySelector("div").innerHTML).toEqual("<div><input></div>");
  });
});

//
