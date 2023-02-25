/**
 * The routing configuration of the app. 
 * 
 */
export interface RoutingConfig {
  /**
   * a list of routes
   */
  routes: RouteConfig[];
  /**
   * the component to render when a route is not found
   */
  notFoundComponent: React.FunctionComponent;
  /**
   * the component to render when a route has the flag `auth` and the `RouterAuthenticationService.isAuthenticated()` returns false
   */
  loginComponent: React.FunctionComponent;
}

/**
 * The configuration of a route
 */
export interface RouteConfig {
  /**
   * The component to render at this path
   */
  component: React.FunctionComponent;
  /**
   * the path of this route: starts with /
   */
  path: string;
  /**
   * if true, the `RouterAuthenticationService.isAuthenticated()` method is called, and if it returns false, the LogincComponent is rendered
   */
  auth?: boolean;
}

/**
 * Provides authentication to the routes
 * @example 
 * 
 * import { RouterAuthenticationService } from "terso-routing";
 * 
 * \@injectable()
 * export class AuthenticationServiceImpl implements RouterAuthenticationService {
 *   isAuthenticated() {
 *     return Boolean(this.user);
 *   }
 * }
 */
export interface RouterAuthenticationService {

  /**
   * if this method implementation returns true, the authenticaed routes are rendered, otherwise is rendered the login component.
   */
  isAuthenticated(): boolean;
}
