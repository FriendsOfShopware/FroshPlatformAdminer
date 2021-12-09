const { ApiService } = Shopware;

class AdminerService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'frosh_adminer') {
        super(httpClient, loginService, apiEndpoint);
    }

    loginToAdminer() {
        const apiRoute = `${this.getApiBasePath()}/login`;
        return this.httpClient.get(
            apiRoute,
            {
                headers: this.getBasicHeaders()
            }
        ).then((response) => {
            return ApiService.handleResponse(response);
        });
    }
}

export default AdminerService;
