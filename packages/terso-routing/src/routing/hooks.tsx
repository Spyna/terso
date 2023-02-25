import { useParams } from "react-router";



export declare type RouterParam<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

/**
 * The useRouterParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
 * @returns Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
 */
export function useRouterParams(): Readonly<RouterParam<string>> {
  return useParams();
}
