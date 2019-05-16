import { Component } from 'src/core/shopware';
import template from './frosh-adminer-view.html.twig';

Component.register('frosh-adminer-view', {
    template,

    inject: ['AdminerService'],

    created() {
        this.createdComponent();
    },

    data() {
        return {
            apiAdminerUrl: false
        };
    },

    methods: {
        createdComponent() {
            this.AdminerService.loginToAdminer().then(response => {
                this.apiAdminerUrl = response.url;
            });
        },

        openNewTab() {
            window.open(this.apiAdminerUrl);
        }
    }
});

