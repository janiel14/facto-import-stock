import { API } from "../../lib/request";

export class WixController {
    /**
     * construtor
     */
    construtor() {}

    /**
     * _queryng
     * @param token
     * @param offset
     */
    async _queryng(token: string, offset: number): Promise<any> {
        try {
            const api = new API("https://www.wixapis.com");
            return await api.post(
                "/stores/v1/products/query",
                {
                    query: {
                        paging: {
                            limit: 100,
                            offset: offset
                        }
                    }
                },
                {
                    "Content-Type": "application/json;",
                    Authorization: token
                }
            );
        } catch (error) {
            console.error("WixController._queryng: ", error);
            throw error;
        }
    }

    /**
     * getProducts
     * @param token
     */
    async getProducts(token: string): Promise<any> {
        try {
            let products = [];
            let wixProducts = {
                products: [],
                totalResults: 0,
                metadata: {
                    items: 100
                }
            };
            let offset = 0;
            do {
                wixProducts = await this._queryng(token, offset);
                products = products.concat(wixProducts.products);
                if (offset == 0) offset = offset + 1;
                offset = offset + wixProducts.metadata.items;
            } while (wixProducts.totalResults > products.length);
            return products;
        } catch (error) {
            console.error("WixController.getProducts: ", error);
            throw error;
        }
    }

    /**
     * updateProduct
     * @param token
     * @param productId
     * @param product
     */
    async updateProduct(
        token: string,
        productId: string,
        product: any
    ): Promise<any> {
        try {
            const api = new API("https://www.wixapis.com");
            return await api.patch(
                `/stores/v1/products/${productId}`,
                product,
                {
                    "Content-Type": "application/json;",
                    Authorization: token
                }
            );
        } catch (error) {
            console.error("WixController.updateProduct: ", error);
            throw error;
        }
    }

    /**
     * createProduct
     * @param token
     * @param product
     */
    async createProduct(token: string, product: any): Promise<any> {
        try {
            const api = new API("https://www.wixapis.com");
            return await api.post("/stores/v1/products", product, {
                "Content-Type": "application/json",
                Authorization: token
            });
        } catch (error) {
            console.error("WixController.createProduct: ", error);
            throw error;
        }
    }

    /**
     * compareProductStock
     * @param products
     * @param stock
     */
    compareProductStock(products: any, stock: any) {
        try {
            const importProducts = [];
            stock.forEach(item => {
                let imported = products.find(product => {
                    return product.name === item.referencia;
                });
                if (!imported) importProducts.push(item);
            });
            return importProducts;
        } catch (error) {
            console.error("WixController.comparreProductStock: ", error);
            throw error;
        }
    }

    /**
     * convertGradeToOptions
     * @param grades
     */
    convertGradeToOptions(grades: any) {
        try {
            const options = [];
            let sizes = [];
            grades.forEach(size => {
                sizes.push({
                    description: size.tamanho,
                    value: size.estoque
                });
            });
            options.push({
                name: "Tamanho",
                choices: sizes
            });
            return options;
        } catch (error) {
            console.error("WixController.convertGradeToOptions: ", error);
            throw error;
        }
    }

    /**
     * importProducts
     * @param user
     * @param stocks
     */
    async importProducts(user: any, stocks: any): Promise<any> {
        try {
            const products = await this.getProducts(user.accessToken);
            const newProducts = this.compareProductStock(products, stocks);
            if (newProducts.length) {
                let interator = newProducts[Symbol.iterator]();
                let next = interator.next();
                do {
                    let stock = next.value;
                    let product = {
                        product: {
                            weight: 0,
                            name: stock.referencia,
                            visible: false,
                            productOptions: this.convertGradeToOptions(
                                stock.grade
                            ),
                            description: stock.referencia,
                            productType: "physical",
                            priceData: {
                                price: 0.0
                            },
                            manageVariants: true,
                            discount: {
                                type: "UNDEFINED",
                                value: 0.0
                            }
                        }
                    };
                    await this.createProduct(user.accessToken, product);
                    next = interator.next();
                } while (!next.done);
            }
        } catch (error) {
            console.error("WixController.importProducts: ", error);
            throw error;
        }
    }
}
