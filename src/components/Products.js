import React from 'react';
import ProductCard from './ProductCard';

const Products = React.memo(({ data }) => {

  return <section>
    <div className='products'>
      {
        data.map(product => (
          <ProductCard key={product._id} product={product} />
        ))
      }
    </div>
  </section>;
});

export default Products;
