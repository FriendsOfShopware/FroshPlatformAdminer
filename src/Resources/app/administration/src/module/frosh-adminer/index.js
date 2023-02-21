import './acl';
import './page/frosh-adminer-view';

const { Module } = Shopware;

Module.register('frosh-adminer', {
    type: 'plugin',
    name: 'frosh-adminer.title',
    description: 'frosh-adminer.title',
    color: '#9AA8B5',
    icon: 'regular-database',
    favicon: 'icon-module-settings.png',

    routes: {
        list: {
            component: 'frosh-adminer-view',
            path: 'list',
            privilege: 'system.frosh_adminer'
        }
    },

    settingsItem: [
        {
            group: 'plugins',
            to: 'frosh.adminer.list',
            icon: 'regular-database',
            label: 'frosh-adminer.title',
            privilege: 'system.frosh_adminer'
        }
    ],

    extensionEntryRoute: {
        extensionName: 'FroshPlatformAdminer',
        route: 'frosh.adminer.list'
    }
});
