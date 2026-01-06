import { Container } from 'inversify';

import { bindControllers } from '#/infrastructure/config/di/bindings/controllers';
import { bindServices } from '#/infrastructure/config/di/bindings/services';
import { bindUseCases } from '#/infrastructure/config/di/bindings/use-cases';

const container = new Container();

bindControllers(container);
bindServices(container);
bindUseCases(container);

export { container };
