# Terso

> dependency injection hooks for React.

*Terso* is a pragmatic hook and HOC library for React, that provides dependency injection to a React application. 
It uses [inversify js](https://inversify.io/) as an IoC container, in combination with [mobx](https://mobx.js.org/) for state management.

Is it a revolutionary library? No! It is just a collection of functions, born with the sole need of not wanting to copy/paste the same code into different projects.

- [Terso](#terso)
  - [Quick start](#quick-start)
    - [1. Install](#1-install)
    - [1.1 Configure typescript](#11-configure-typescript)
    - [2. Wrap your `App` in the `terso` IoC Context](#2-wrap-your-app-in-the-terso-ioc-context)
    - [3. Use a dependency in React Components](#3-use-a-dependency-in-react-components)
  - [Hooks](#hooks)
    - [`useInject`](#useinject)
    - [`useModel`](#usemodel)

## Quick start 

Quick start in three easy steps

### 1. Install

```
npm install terso
# yarn add terso
```

### 1.1 Configure typescript 

Add these entries in the `compilerOptions` of your typescript config 

```json

"experimentalDecorators": true,
"types": ["reflect-metadata"],

```

### 2. Wrap your `App` in the `terso` IoC Context


```Typescript 
// App.tsx

import { withIoc } from "terso";
import { Container } from "inversify";
import { configureContainer } from "./ioc/ioc.config";

function App() {
  return <main>My app</main>
}

export default withIoc(App, configureContainer);


// ioc/ioc.types.ts
export const TYPES = {
  TodoStore: Symbol.for("TodoStore"),
  TodoBaseUrl: Symbol.for("TodoBaseUrl"),
};

// oic.config.js
import "reflect-metadata"
import {TYPES} from "./ioc.types";
//import {TodoStore } from "../stores/TodoStore"
//import {TodoStoreImpl } from "../stores/impl/TodoStoreImpl"

export function configureContainer(container: Container) {
  
  // define here the dependencies of your code: services, api, repositories, configurattions
  // for example: 
  container.bind<string>(TYPES.TodoBaseUrl).toConstantValue(/*config.todoBaseUrl*/ "some url");
  // container
  //   .bind<TodoStore>(TYPES.TodoStore)
  //   .to(TodoStoreImpl)
  //   .inSingletonScope();

}
```

The function `configureContainer` is mandatory and takes the IoC container as an argument. You can add (bind) alle the dependency you need in the app into the container.

### 3. Use a dependency in React Components

```Typescript

import { useInject } from "terso";
import { observer } from "mobx-react-lite";
import { TYPES } from "../ioc/ioc.types";
import { TodoStore } from "../stores/TodoStore";

export default observer(function Todolist() {
  const todoStore = useInject<TodoStore>(TYPES.TodoStore);
  return (
    <main>
      <h2>Todo list</h2>
      {todoStore.todos
        .slice()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
    </main>
  );
})

```

## Hooks

`terso` provides these hooks: 

* `useInject` 
* `useModel` 

### `useInject` 


The hook `useInject` takes an object from the IoC container and returns it, ready to be used in a React component.


**Signature**

```typescript
useInject<T>(type: ServiceIdentifier<T>): T
```

**Usage** 

```typescript
const myService = useInject<MyServiceType>(MyServiceIdentifier);
```

**Example**

```typescript

import { useInject } from "terso";
import { observer } from "mobx-react-lite";
import { TYPES } from "../ioc/ioc.types";
import { TodoStore } from "../stores/TodoStore";

export default observer(function Todolist() {
  const todoStore = useInject<TodoStore>(TYPES.TodoStore);

  return (
    <main>
      <h2>Todo list</h2>
      {todoStore.todos
        .slice()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
    </main>
  );
})

```

### `useModel` 

`useModel` provides a `ViewModel` implementation in a React Component. 

A `ViewModel` is an interface, borrowed from the famous pattern [Model-View-Presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter). To use it you have to create an implementation of the `ViewModel` interface and an implementation of a `Presenter` that are defined as follows: 

```typescript
export interface ViewModel {
  [key: string]: any;
}

export interface Presenter {
  loadViewModel(): Promise<void>;
  cleanModel(): Promise<void>;
  viewModel: ViewModel;
}
```

The `Presenter` interface provides a method to load the `ViewModel`, a method to clean, and the `ViewModel` itself. 

Presenters are useful for leaving React components simple by giving them a flat object to display: the `ViewModel`. The presenter hides the business logic from the React component, so finally React components can be used for what they were designed: **creating user interfaces**.

**Signature**

```typescript
export function useModel<T extends ViewModel>(type: ServiceIdentifier<Presenter>): T 
```

**Usage** 

```typescript
const viewModel = useModel<MyViewModelType>(MyPresenterIdentifier);
```

**Example**

```typescript
// Todo.tsx
import { observer } from "mobx-react-lite";
import { Todo as TodoType } from "../../../domain/Todo";
import { useModel } from "terso";
import { TodoPresenter, TodoViewModel } from "../../../presenter/TodoPresenter";

interface TodoProps {
  todo: TodoType;
}

export default observer(function Todo({ todo }: TodoProps) {
  const viewModel = useModel<TodoViewModel>(TodoPresenter);

  return (
    <li className="todo-card">
      <span className={todo.completed ? "done" : "todo"}>
        {todo.id} - {todo.title}
      </span>
      {viewModel.canDelete && <button>delete</button>}
    </li>
  );
})


// TodoPresenter.ts
import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { TYPES } from "../ioc/ioc.types";
import {
  Permissions,
  type AuthorizationService,
} from "../service/AuthorizationService";
import { type TodoStore } from "../service/TodoService";
import { Presenter, ViewModel } from "terso";

export interface TodoViewModel extends ViewModel {
  canDelete: boolean;
}

@injectable()
export class TodoPresenter implements Presenter {
  @inject(TYPES.TodoStore)
  private readonly todoService!: TodoStore;

  @inject(TYPES.AuthorizationServiceType)
  private readonly authService!: AuthorizationService;

  private canDelete: boolean = false;

  constructor() {
    makeObservable<TodoPresenter, "canDelete">(this, {
      canDelete: observable,
      loadViewModel: action,
    });
  }
  loadViewModel(): Promise<void> {
    this.canDelete = this.authService.hasPermission(Permissions.todo.delete);
    return Promise.resolve();
  }
  cleanModel(): Promise<void> {
    return Promise.resolve();
  }

  get viewModel(): TodoViewModel {
    return {
      canDelete: this.canDelete,
    };
  }
}
```


