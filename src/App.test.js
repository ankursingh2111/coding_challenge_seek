import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { shallow, mount } from "enzyme";

describe("Testing the Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  describe("Testing the App Componenet", () => {
    let AppComponent;
    beforeEach(() => {
      AppComponent = shallow(<App />);
    });
    it("form component is rendered", () => {
      expect(AppComponent.find("form").length).toEqual(1);
    });

    it("App component has 2 children", () => {
      expect(AppComponent.children().length).toEqual(2);
    });
    it("form component has 3 div element", () => {
      expect(AppComponent.find("div").length).toEqual(3);
    });
  });
  describe("Testing the form component", () => {
    let AppComponent;
    beforeEach(() => {
      AppComponent = mount(<App />);
    });
    it("form component has a child label", () => {
      expect(AppComponent.find("label").length).toEqual(1);
    });
    it("form component has input element", () => {
      expect(AppComponent.find("input").length).toEqual(3);
    });
  });
});
