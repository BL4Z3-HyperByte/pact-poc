import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProductsAPI from './API/Products';
import Dialog from './components/Dialog/Dialog';
import Modal from './components/Modal/Modal';
const API = new ProductsAPI();

function App() {
  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const products = await API.getProducts();
      setProducts(products.products);
    })();
  }, []);

  function onProductClick(e, id) {
    e.preventDefault();
    setViewProduct(id);
  }

  function modalCloseBtnHandler() {
    setViewProduct(null);
  }

  return (
    <>
      {viewProduct ? (
        <Modal>
          <Dialog
            closeHandler={modalCloseBtnHandler}
            productId={viewProduct}
          />
        </Modal>
      ) : null}
      <div>
        <table className={'w-[800px] font-light text-sm'}>
          {products.map((product, i) => {
            return (
              <tr
                key={Math.random()}
                onClick={(e) => {
                  onProductClick(e, product.id);
                }}
                className={
                  'w-full border-[2px] border-white hover:bg-white hover:text-black select-none'
                }>
                <td className={'p-[0.25rem] border-[2px] border-white'}>
                  {product.id}
                </td>
                <td className={'p-[0.25rem] border-[2px] border-white'}>
                  {product.name}
                </td>
                <td className={'p-[0.25rem] border-[2px] border-white'}>
                  {product.price}
                </td>
                <td className={'p-[0.25rem] border-[2px] border-white'}>
                  {product.description}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
