import React from "react";
import { IocContainerContext } from "../ioc/ContainerContext";
import { interfaces } from 'inversify';

/**
 * 
 * The hook `useInject` takes an object from the IoC container and returns it, ready to be used in a React component.
 * 
 * @param type an identifier to retrieve the desidered object from the container
 * @returns an object previously stored in the IoC container
 * @example 
 * const todoStore = useInject<TodoStore>(TYPES.TodoStore);
 */
export function useInject<T>(type: interfaces.ServiceIdentifier<T>): T {
  const containerContext = React.useContext(IocContainerContext);

  const object = React.useMemo<T>(
    () => containerContext.container.get<T>(type),
    [containerContext, type]
  );
  return object;
}
