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
     * post
     * @param {string} endpoint
     * @param {object} body
     * @returns
     * @memberof API
     */
    async post(endpoint: string, body: object): Promise<any> {
        return new Promise((resolve, reject) => {
            request.post(
                `${this.baseUrl}${endpoint}`,
                {
                    form: body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                (error, response, body) => {
                    if (error) reject(error);

                    if (response.statusCode == 200) resolve(JSON.parse(body));
                    else reject(body);
                }
            );
        });
    }
}
