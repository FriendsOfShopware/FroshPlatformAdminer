import './page/frosh-adminer-view';

const { Module } = Shopware;

Module.register('frosh-adminer', {
    type: 'plugin',
    name: 'Adminer',
    description: 'frosh-adminer.general.description',
    title: 'frosh-adminer.general.description',
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
        label: 'frosh-adminer.general.navigationLabel',
        color: '#9AA8B5',
        icon: 'default-device-server',
        path: 'frosh.adminer.list',
        position: 100
    }]
});
