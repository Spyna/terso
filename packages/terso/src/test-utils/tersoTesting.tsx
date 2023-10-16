import { container } from "../ioc/ioc.config";
import { Presenter, ViewModel } from "../presenter/Presenter";
import { interfaces } from "inversify";

export function mockModel<T extends ViewModel>(presenter: interfaces.ServiceIdentifier<Presenter<T>>, value: T): void {
  const mockPresenter = {
    loadViewModel: () => Promise.resolve(),
    cleanModel: () => Promise.resolve(),
    viewModel: value,
  };
  container.bind<Presenter<T>>(presenter).toConstantValue(mockPresenter);
}
