import { createElement } from "../createElement";

const ELEMENT_TYPE = "div";
const ELEMENT_PROPS = {
  id: "container",
  "data-enzyme-id": "createElementDiv"
};
test("it creates an element", () => {
  expect(createElement(ELEMENT_TYPE, ELEMENT_PROPS)).toEqual({
    type: "div",
    props: {
      id: "container",
      "data-enzyme-id": "createElementDiv"
    }
  });
});

test("it creates an element with children", () => {
  expect(
    createElement(
      ELEMENT_TYPE,
      ELEMENT_PROPS,
      createElement(ELEMENT_TYPE, ELEMENT_PROPS)
    )
  ).toEqual({
    type: "div",
    props: {
      id: "container",
      "data-enzyme-id": "createElementDiv",
      children: [
        {
          type: "div",
          props: {
            id: "container",
            "data-enzyme-id": "createElementDiv"
          }
        }
      ]
    }
  });
});

test("it creates an element with a text node", () => {
  expect(
    createElement("p", {
      class: "amazinglyStyledParagraph",
      children: [
        {
          type: "TEXT ELEMENT",
          props: { nodeValue: "Foo" }
        }
      ]
    })
  ).toEqual({
    props: {
      children: [{ props: { nodeValue: "Foo" }, type: "TEXT ELEMENT" }],
      class: "amazinglyStyledParagraph"
    },
    type: "p"
  });
});
