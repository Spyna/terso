import { Container } from "inversify";
import { RouterServiceImpl } from "../routing/RouterServiceImpl";
import {
  RouterType,
  RoutingService,
  RoutingServiceIdentifier,
} from "../routing/RoutingService";
import { RoutingConfig } from "../types";

/**
 * 
 * @param container the instance of the IoC container provided from terso
 * @param routingConfig the configuration of the app routes.
 * @example
 * const routingConfig: RoutingConfig = {
 * notFoundComponent: NotFoundPage,
 * loginComponent: LoginPage,
 * routes: [
 *   {
 *     component: IndexPage,
 *     path: "/",
 *     auth: true,
 *   },
 *   {
 *     component: AboutPage,
 *     path: "/about",
 *   },
 * ],
 * };
 * 
 * // ioc.config.ts
 * function configureContainer(container: Container) {
 *   configureRouting(container, routingConfig)
 * }
 */
export function configureRouting(
  container: Container,
  routingConfig: RoutingConfig
) {
  container.bind<RoutingConfig>(RouterType).toConstantValue(routingConfig);

  container
    .bind<RoutingService>(RoutingServiceIdentifier)
    .to(RouterServiceImpl)
    .inSingletonScope();
}
