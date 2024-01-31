import React, { useEffect, useRef, useState } from 'react';
import ProductsAPI from '../../API/Products';

const API = new ProductsAPI();

function Dialog({ closeHandler, productId }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const product = await API.getProductData(productId);
      console.table(product);
      setProduct(product);
    })();
  }, []);

  function onBtnClick(e) {
    e.preventDefault();
    closeHandler();
  }
  return (
    <div
      className={
        'aspect-[4/3] w-[30vw] p-[1rem] h-auto text-black bg-white flex flex-col items-center justify-start gap-[1rem] rounded-md'
      }>
      <p className={'mt-[1rem] mb-[1.5rem] text-lg'}>PRODUCT DETAILS</p>
      <p>{product.id}</p>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button
        onClick={onBtnClick}
        className={'text-white'}>
        CLOSE
      </button>
    </div>
  );
}

export default Dialog;
