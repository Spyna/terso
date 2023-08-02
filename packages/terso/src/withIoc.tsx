import { Container } from "inversify";
import React, { Context, ReactNode } from "react";
import { InversifyContext, IocContainerContext } from "./ioc/ContainerContext";
import { container } from "./ioc/ioc.config";

export interface ProviderProps {
  context?: Context<InversifyContext>;
  children?: ReactNode;
}

let configured = false;

/**
 *
 * Wraps a React Component with the IoC context, that allows you to use `useInject` and `useModel` hooks.
 *
 * @param WrappedComponent A React Component that you want to provide dependency injection to.
 * @param configureContainer The function `configureContainer` is mandatory and takes the IoC container as an argument. You can add (bind) alle the dependency you need in the app into the container.
 *
 * @returns The component wrapped with the IoC conttext, so that you can use `useInject` and `useModel` hooks.
 * @example
 * // App.tsx
 * import { withIoc } from "terso";
 * import { Container } from "inversify";
 * import { configureContainer } from "./ioc/ioc.config";
 *
 * function App() {
 *   return <main>My app</main>
 * }
 *
 * export default withIoc(App, configureContainer);
 *
 *
 * // ioc/ioc.types.ts
 * export const TYPES = {
 *   TodoStore: Symbol.for("TodoStore"),
 *   TodoBaseUrl: Symbol.for("TodoBaseUrl"),
 * };
 *
 * // oic.config.js
 * import {TYPES} from "./ioc.types";
 *
 * export function configureContainer(container: Container) {
 *
 *   container.bind<string>(TYPES.TodoBaseUrl).toConstantValue("some url");
 *   container
 *      .bind<TodoStore>(TYPES.TodoStore)
 *      .to(TodoStoreImpl)
 *      .inSingletonScope();
 *
 * }
 */
export function withIoc(
  WrappedComponent: React.ElementType | React.FunctionComponent<any>,
  configureContainer: (container: Container) => void
): (props: ProviderProps) => JSX.Element {
  return function Hoc(props: ProviderProps) {
    const configure = React.useCallback(
      (container: Container) => configureContainer && configureContainer(container),
      []
    );

    if (!configured) {
      configure(container);
      configured = true;
    }
    const contextValue = React.useMemo(() => ({ container: container }), []);

    return (
      <IocContainerContext.Provider value={contextValue}>
        <WrappedComponent {...props} />
      </IocContainerContext.Provider>
    );
  };
}

/**
 * reset the container and unbind all.
 */
export function reset() {
  container.unbindAll()
  configured = false;
}
