import React from "react";
import { BrowserRouter } from "react-router-dom";

/**
 * 
 * @param WrappedComponent The Component you want to prvide routing to, usually the entry point of your application: App.tsx
 * @returns A Component that wrap the original one, with routing capacity
 * @example
 * export default withIoc(withRouter(App), configureContainer);
 * 
 */
export function withRouter(WrappedComponent: React.ElementType): () => JSX.Element {
  return function Hoc() {
    return (
      <BrowserRouter>
        <WrappedComponent />
      </BrowserRouter>
    );
  };
}
