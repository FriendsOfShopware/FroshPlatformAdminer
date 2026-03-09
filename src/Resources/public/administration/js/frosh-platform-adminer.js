(()=>{var n=Shopware.Classes.ApiService,t=class extends n{constructor(e,i,m="frosh_adminer"){super(e,i,m)}loginToAdminer(){let e=`${this.getApiBasePath()}/login`;return this.httpClient.get(e,{headers:this.getBasicHeaders()}).then(i=>n.handleResponse(i))}},a=t;var{Application:o}=Shopware;o.addServiceProvider("AdminerService",r=>{let e=o.getContainer("init");return new a(e.httpClient,r.loginService)});Shopware.Service("privileges").addPrivilegeMappingEntry({category:"additional_permissions",parent:null,key:"system",roles:{frosh_adminer:{privileges:[],dependencies:[]}}});var s=`<sw-page class="adminer">
    <template #smart-bar-header>
        <h2>Adminer</h2>
    </template>

    <template #content>
        <iframe v-if="apiAdminerUrl" :src="apiAdminerUrl" width="100%" height="99%" frameborder="0"></iframe>
    </template>

    <template #smart-bar-actions>
        <sw-button variant="primary" v-if="apiAdminerUrl" @click="openNewTab">
            {{ $tc('frosh-adminer.openInNewTab') }}
        </sw-button>
    </template>
</sw-page>
`;var{Component:d}=Shopware;d.register("frosh-adminer-view",{template:s,inject:["AdminerService"],created(){this.createdComponent()},data(){return{apiAdminerUrl:!1}},methods:{createdComponent(){this.AdminerService.loginToAdminer().then(r=>{this.apiAdminerUrl=r.url})},openNewTab(){window.open(this.apiAdminerUrl)}}});var{Module:l}=Shopware;l.register("frosh-adminer",{type:"plugin",name:"frosh-adminer.title",description:"frosh-adminer.title",color:"#9AA8B5",icon:"regular-database",favicon:"icon-module-settings.png",routes:{list:{component:"frosh-adminer-view",path:"list",privilege:"system.frosh_adminer"}},settingsItem:[{group:"plugins",to:"frosh.adminer.list",icon:"regular-database",label:"frosh-adminer.title",privilege:"system.frosh_adminer"}],extensionEntryRoute:{extensionName:"FroshPlatformAdminer",route:"frosh.adminer.list"}});})();
