const { Module } = Shopware;
import './page/frosh-adminer-view';

Module.register('frosh-adminer', {
    type: 'plugin',
    name: 'Adminer',
    description: 'Adminer',
    color: '#9AA8B5',
    icon: 'default-device-server',
    favicon: 'icon-module-settings.png',

    routes: {
        list: {
            component: 'frosh-adminer-view',
            path: 'list'
        }
    },

    navigation: [{
        label: 'Adminer',
        color: '#9AA8B5',
        icon: 'default-device-server',
        path: 'frosh.adminer.list',
        position: 100
    }]
});
