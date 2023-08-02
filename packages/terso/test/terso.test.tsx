import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Presenter, ViewModel, useInject, useModel, withIoc } from "../src";
import { Container, injectable } from "inversify";
import React from "react";
import { reset } from "../src/hoc/withIoc";

describe("WithIoc test", () => {
  afterEach(() => {
    reset();
  });

  it("should render the component wrapped in WithHoc", () => {
    function App() {
      return <div>hello</div>;
    }
    function setup(container: Container) {
      expect(container).toBeDefined();
    }

    const WithIoc = withIoc(App, setup);

    render(<WithIoc />);

    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("should inject a constant value in the component", () => {
    const serviceIdentifier = Symbol.for("serviceIdentifier");
    function App() {
      const value = useInject<string>(serviceIdentifier);
      return <div>{value}</div>;
    }

    const value = "the value";

    function setup(container: Container) {
      container.bind<string>(serviceIdentifier).toConstantValue(value);
    }

    const WithIoc = withIoc(App, setup);
    render(<WithIoc />);
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("should inject a model in the component", () => {
    interface TestModel extends ViewModel {
      value: string;
    }

    const value = "the value";

    @injectable()
    class TestPresenter implements Presenter<TestModel> {
      loadViewModel(): Promise<void> {
        return Promise.resolve();
      }
      cleanModel(): Promise<void> {
        return Promise.resolve();
      }

      get viewModel() {
        return {
          value: value,
        };
      }
    }

    function App() {
      const model = useModel<TestModel>(TestPresenter);
      return <div>{model.value}</div>;
    }

    function setup(container: Container) {
      container
        .bind<TestPresenter>(TestPresenter)
        .to(TestPresenter)
        .inSingletonScope();
    }

    const WithIoc = withIoc(App, setup);
    render(<WithIoc />);
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
