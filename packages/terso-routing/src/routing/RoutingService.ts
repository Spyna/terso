import { RouteConfig } from "../types";

export const RouterType = Symbol.for("RouterType");

export const RoutingServiceIdentifier = Symbol.for("RoutingServiceType");
/**
 * The identifier to use for add the implementation of the `RouterAuthenticationService` in the IoC container.
 */
export const AuthenticationServiceType = Symbol.for(
  "AuthenticationServiceType"
);

export interface RoutingService {
  notFoundComponent(): React.FunctionComponent;
  getRoutes(): RouteConfig[];
  loginComponent(): React.FunctionComponent;
  isAuthenticated(): boolean;
}
