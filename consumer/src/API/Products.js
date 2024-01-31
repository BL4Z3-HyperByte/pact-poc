class ProductsAPI {
  constructor(config = {}) {
    this.host = config.host ?? 'localhost';
    this.port = config.port ?? 9999;
    this.url = config.url ?? 'products';
    console.log(
      'MOCK SERVER: ',
      `http://${this.host}:${this.port}/${this.url}`
    );
  }

  async getProducts() {
    const response = await fetch(
      `http://${this.host}:${this.port}/${this.url}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const result = await response.json();
    return result;
  }

  async getProductData(id) {
    const response = await fetch(
      `http://${this.host}:${this.port}/${this.url}/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const result = await response.json();
    return result;
  }
}

export default ProductsAPI;
