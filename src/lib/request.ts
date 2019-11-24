import * as request from "request";

export class API {
    baseUrl: string;

    /**
     *Creates an instance of API.
     * @param {string} baseUrl
     * @memberof API
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * callback
     * @param error
     * @param response
     * @param body
     * @param resolve
     * @param reject
     */
    _callback(error: any, response: any, body: any, resolve: any, reject: any) {
        if (error) reject(error);

        if (response.statusCode == 200) resolve(JSON.parse(body));
        else reject(body);
    }

    /**
     * post
     * @param {string} endpoint
     * @param {object} body
     * @returns
     * @memberof API
     */
    async post(endpoint: string, body: object, headers: object): Promise<any> {
        const options = {
            headers: null,
            form: null,
            body: null
        };
        options.headers = headers;
        if (headers["Content-Type"] === "application/json")
            options.body = JSON.stringify(body);
        else options.form = body;
        return new Promise((resolve, reject) => {
            request.post(
                `${this.baseUrl}${endpoint}`,
                options,
                (error, response, body) => {
                    this._callback(error, response, body, resolve, reject);
                }
            );
        });
    }

    /**
     * get
     * @param {string} endpoint
     * @param {object} body
     * @returns
     * @memberof API
     */
    async get(endpoint: string, headers: object): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(
                `${this.baseUrl}${endpoint}`,
                {
                    headers: headers
                },
                (error, response, body) => {
                    this._callback(error, response, body, resolve, reject);
                }
            );
        });
    }

    /**
     * patch
     * @param {string} endpoint
     * @param {object} body
     * @returns
     * @memberof API
     */
    async patch(endpoint: string, body: object, headers: object): Promise<any> {
        const options = {
            headers: null,
            form: null,
            body: null
        };
        options.headers = headers;
        if (headers["Content-Type"] === "application/json")
            options.body = JSON.stringify(body);
        else options.form = body;
        return new Promise((resolve, reject) => {
            request.patch(
                `${this.baseUrl}${endpoint}`,
                options,
                (error, response, body) => {
                    this._callback(error, response, body, resolve, reject);
                }
            );
        });
    }
}
