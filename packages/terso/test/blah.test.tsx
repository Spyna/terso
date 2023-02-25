import * as React from "react";
import * as ReactDOM from "react-dom";
import { withIoc } from "../src";

function App() {
  return <div>hello</div>;
}

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    function setup() {}

    const WithIoc = withIoc(((<App />) as any) as React.ElementType, setup);

    ReactDOM.render(<WithIoc />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
