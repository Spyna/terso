import { useEffect } from "react";
import { Presenter, ViewModel } from "../presenter/Presenter";
import { interfaces } from "inversify";
import { useInject } from "./useInject";

/**
 * `useModel` provides a `ViewModel` implementation in a React Component.
 *
 * @param type the identifier of the implementation of the `Presenter`
 * @returns the `ViewModel` loaded by the presenter.
 * @example
 * const viewModel = useModel<MyViewModelType>(MyPresenterIdentifier);
 */
export function useModel<T extends ViewModel>(type: interfaces.ServiceIdentifier<Presenter<T>>): T {
  const presenter = useInject<Presenter<T>>(type);

  useEffect(() => {
    async function bootrstrap() {
      try {
        await presenter.loadViewModel();
      } catch (error) {
        console.log("TERSO: an error occurred while loading the view model", error);
      }
    }
    bootrstrap();
    return () => {
      presenter.cleanModel();
    };
  }, [presenter]);

  return presenter.viewModel;
}
