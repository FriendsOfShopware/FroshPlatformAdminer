const { Component } = Shopware;
import template from './frosh-adminer-view.html.twig';

Component.register('frosh-adminer-view', {
    template,

    inject: ['AdminerService'],

    data() {
        return {
            apiAdminerUrl: false
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    created() {
        this.createdComponent();
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

