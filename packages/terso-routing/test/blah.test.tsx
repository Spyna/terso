import * as React from "react";
import * as ReactDOM from "react-dom";
import { withIoc } from "terso";

function App() {
  return <div>hello</div>;
}

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
