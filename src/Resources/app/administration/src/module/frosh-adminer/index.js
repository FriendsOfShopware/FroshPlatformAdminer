import './page/frosh-adminer-view';

const { Module } = Shopware;

Module.register('frosh-adminer', {
    type: 'plugin',
    name: 'frosh-adminer.title',
    description: 'frosh-adminer.title',
    color: '#9AA8B5',
    icon: 'default-device-server',
    favicon: 'icon-module-settings.png',

    routes: {
        list: {
            component: 'frosh-adminer-view',
            path: 'list',
        }
    },

    settingsItem: [
        {
            group: 'plugins',
            to: 'frosh.adminer.list',
            icon: 'default-device-server',
            label: 'frosh-adminer.title'
        }
    ],

    extensionEntryRoute: {
        extensionName: 'FroshPlatformAdminer',
        route: 'frosh.adminer.list'
    }
});
