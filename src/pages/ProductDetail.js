import React from 'react';
import { useParams } from 'react-router-dom'
import {getData, getOneProduct} from '../api/productAPI';
import ProductInfo from '../components/ProductInfo';
import { useQuery } from 'react-query';


const ProductDetail = () => {
  const { id } = useParams()
  const url = getOneProduct(id)
  const { data: product, isLoading, error } = useQuery(url, getData)

  return <main>
    <ProductInfo
    product={product}
    loading={isLoading}
    error={error}
    />
  </main>;
};

export default ProductDetail;
