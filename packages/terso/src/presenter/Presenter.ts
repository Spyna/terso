/**
 * The view model is a basic structure that can contains pretty much anything. Each implementation of a `Presenter` must returns a view model
 */
export interface ViewModel {
  [key: string]: any;
}

/**
 * The `Presenter` interface provides a method to load the `ViewModel`, a method to clean, and the `ViewModel` itself.
 *
 * Presenters are useful for leaving React components simple by giving them a flat object to display: the `ViewModel`.
 *
 * The presenter hides the business logic from the React component, so finally React components can be used for what they were designed: **creating user interfaces**.
 *
 */
export interface Presenter<T extends ViewModel> {
  /**
   * a function that is called after the first render (like useEffect) to laod the view model
   */
  loadViewModel(): Promise<void>;
  /**
   * a function that is called after the component if unmounted
   */
  cleanModel(): Promise<void>;
  /**
   * the view model, to access data and action from
   */
  viewModel: T;
}
