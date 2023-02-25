import { inject, injectable } from "inversify";
import 'reflect-metadata';
import type {  RouterAuthenticationService, RoutingConfig } from "../types";
import {
  RouterType,
  RoutingService,
  AuthenticationServiceType,
} from "./RoutingService";


@injectable()
export class RouterServiceImpl implements RoutingService {
  @inject<RoutingConfig>(RouterType)
  routingConfig!: RoutingConfig;

  @inject<RouterAuthenticationService>(AuthenticationServiceType)
  private authService!: RouterAuthenticationService;

  notFoundComponent () {
    return this.routingConfig.notFoundComponent;
  }
  getRoutes () {
    return this.routingConfig.routes;
  }

  loginComponent () {
    return this.routingConfig.loginComponent;
  }

  isAuthenticated () {
    if (!this.authService) {
      return false;
    }
    return this.authService.isAuthenticated();
  }
}
