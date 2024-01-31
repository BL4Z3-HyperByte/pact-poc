import { eachLike, like } from '@pact-foundation/pact/src/v3/matchers';
import { beforeAll, describe, expect, it } from 'vitest';
import { provider } from './pact';
import ProductsAPI from './API/Products';

describe('Pact Consumer Test', () => {
  describe('When API call is made to /products', async () => {
    const DUMMY_PRODUCT = {
      id: 'XYZ-1234',
      name: 'Steel Underpants',
      description: 'Best to protect your virginity.',
      price: '100000.99',
    };

    const RESPONSE = {
      products: eachLike(DUMMY_PRODUCT),
    };

    beforeAll(() => {
      provider.addInteraction({
        states: [{ description: 'There are products' }],
        uponReceiving: 'a GET request to /products',
        withRequest: {
          method: 'GET',
          path: '/products',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: RESPONSE,
        },
      });
    });

    it('will return an object with list of products', async () => {
      return provider.executeTest(async (mockServer) => {
        console.table(mockServer);

        const API = new ProductsAPI({
          port: mockServer.port,
          url: 'products',
        });

        const response = await API.getProducts();

        console.log(response);

        expect(response.products[0]).toMatchInlineSnapshot({
          id: expect.any(String),
          price: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
        }, `
          {
            "description": Any<String>,
            "id": Any<String>,
            "name": Any<String>,
            "price": Any<String>,
          }
        `);
      });
    });
  });

  describe('When an API call is made to /products/000-0000', () => {
    const DUMMY_PRODUCT = {
      id: '000-0000',
      name: 'Steel Underware',
      price: '570.99',
      description:
        'Steel underware with lock. Best when you want to guard your virginity.',
    };

    const RESPONSE = {
      product: DUMMY_PRODUCT,
    };

    beforeAll(() => {
      provider.addInteraction({
        states: [{ description: 'There is a product with the id of 000-0000' }],
        uponReceiving: 'a GET request to /products/000-0000',
        withRequest: {
          method: 'GET',
          path: '/products/000-0000',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          contentType: 'application/json',
          body: like(RESPONSE),
        },
      });
    });

    it('Will send a payload with a product matching the request ID', () => {
      provider.executeTest(async (mockServer) => {
        console.table(mockServer);

        const API = new ProductsAPI({
          port: mockServer.port,
          url: 'products',
        });

        const response = await API.getProductData('000-0000');
        console.log(response);

        expect(response.product).to.have.all.keys([
          'id',
          'name',
          'description',
          'price',
        ]);
      });
    });
  });
});
