import HttpClient from '@azteam/http-client';
import {ErrorException} from '@azteam/error';

const END_POINT = 'https://api.cloudflare.com/client/v4';

class CloudflareAPI {
    constructor(token) {
        this.token = token;
        this.client = new HttpClient({
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    async getListDomain() {
        const res = await this.client.responseJSON().get(`${END_POINT}/zones`);
        if (res.success) {
            return res.result;
        }
        throw new ErrorException('CLOUDFLARE_GET_LIST_DOMAIN', JSON.stringify(res));

    }

    async getDomain(name) {
        const res = await this.client.responseJSON().get(`${END_POINT}/zones`, {
            name
        });
        if (res.success) {
            return res.result[0];
        }
        throw new ErrorException('CLOUDFLARE_GET_DOMAIN', JSON.stringify(res));
    }

    async getListDNS(id) {
        const res = await this.client.responseJSON().get(`${END_POINT}/zones/${id}/dns_records`);
        if (res.success) {
            return res.result;
        }
        throw new ErrorException('CLOUDFLARE_GET_LIST_DNS', JSON.stringify(res));
    }

    async createDNS(id, options = {}) {
        const res = await this.client.postJSON(`${END_POINT}/zones/${id}/dns_records`, options);
        if (res.success) {
            return res.result;
        }
        console.error(JSON.stringify(res));
        throw new ErrorException('CLOUDFLARE_CREATE_DNS', JSON.stringify(res));

    }
}

export default CloudflareAPI;
