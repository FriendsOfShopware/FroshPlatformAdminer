const { Application } = Shopware;

import AdminerService from '../../src/core/service/api/adminer.service';

Application.addServiceProvider('AdminerService', (container) => {
    const initContainer = Application.getContainer('init');

    return new AdminerService(initContainer.httpClient, container.loginService);
});
