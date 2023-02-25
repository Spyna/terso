# Terso routing

> Encapsulated reactive navigation for terso

## Quick start

Quickstart in 3 steps

### 1. Install

```
npm install terso terso-routing
# yarn add terso terso-routing
```

### 2. Add the `CurrentRoute` to your app

```typescript
// App.tsx
import { withIoc, } from "terso";
import {routingConfig} from "./config/app.config.ts"

import { CurrentRoute, withRouter, configureRouting } from "terso-routing";

function App() {
  return (
    <div className="App">
      <CurrentRoute />
    </div>
  );
}

function configureContainer(container: Container) {
  configureRouting(container, routingConfig)
}

export default withIoc(withRouter(App), configureContainer);
```

### 3. Create the router configuration

```typescript

// config/app.config.ts

import AboutPage from "../pages/AboutPage";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import { RoutingConfig } from "terso-routing";

export const routingConfig: RoutingConfig = {
  notFoundComponent: NotFoundPage,
  loginComponent: LoginPage,
  routes: [
    {
      component: IndexPage,
      path: "/",
      auth: true,
    },
    {
      component: AboutPage,
      path: "/about",
    },
  ],
};

```

`RoutingConfig` signature:

```typescript

export interface RoutingConfig {
  routes: RouteConfig[];
  notFoundComponent: React.FunctionComponent;
  loginComponent: React.FunctionComponent;
}

export interface RouteConfig {
  component: React.FunctionComponent;
  path: string;
  auth?: boolean;
}
```

## Navigation

```typescript
import { Link } from "terso-routing";

<Link href="/posts">Posts</Link>
<Link href="/post/:id">Post Xyz</Link>
```

## Route Authentication

Terso routing gives you the possibility to set a route authenticated. In order to manage the authentication, you have to implement the interface `RouterAuthenticationService` and put the implementation in the IoC container with the identifier `AuthenticationServiceType`. 

**Signature**

```typescript
export interface RouterAuthenticationService {
  isAuthenticated(): boolean;
}
```

**Example** 

```typescript
// AuthenticationService.ts
import { RouterAuthenticationService } from "terso-routing";

@injectable()
export class AuthenticationServiceImpl implements RouterAuthenticationService {
  isAuthenticated() {
    return Boolean(this.user);
  }
}

// ioc.config.ts

import { AuthenticationServiceType } from "terso-routing"

//...
container
    .bind<RouterAuthenticationService>(AuthenticationServiceType)
    .to(AuthenticationServiceImpl)
    .inSingletonScope()

```