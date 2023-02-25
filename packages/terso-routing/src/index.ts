import { configureRouting } from "./ioc/ioc.config";
import CurrentRoute from "./routing/CurrentRoute";
import { useRouterParams } from "./routing/hooks";
import Link from "./routing/Link";
import {
  AuthenticationServiceType,
} from "./routing/RoutingService";
import {  withRouter } from "./routing/withRouter";
import type { RoutingConfig, RouterAuthenticationService } from "./types";


export {
  CurrentRoute,
  withRouter,
  useRouterParams,
  Link,
  AuthenticationServiceType,
  configureRouting,
  RouterAuthenticationService,
  RoutingConfig
};

