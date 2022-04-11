import React, { useMemo } from 'react';
import {getData, getProducts} from '../api/productAPI';

import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { useMyContext } from '../context/store';
import useCustomRouter from '../hooks/useCustomRouter';
import {useQuery} from "react-query";

const Home = () => {
  const { refresh, page, limit, sort } = useMyContext()

  const { pushQuery } = useCustomRouter()

  const key = getProducts(limit, page, sort)
  const {data, error, isLoading} = useQuery({
    queryKey: key,
    queryFn: getData
  })

  const totalPages = useMemo(() => {
    if(!data) return 0;
    return Math.ceil(data.count/limit)
  }, [data, limit]);


  return (
      <main>
        <Sorting sort={sort}
                 calback={(sort) => pushQuery({page, sort})}
        />
          { data &&  <Products data={data.products}/> }
          { isLoading && <p style={{ textAlign: 'center' }}>Loading...</p> }
          { error && <p style={{ textAlign: 'center' }}>{error}</p> }
        <Pagination totalPages={totalPages}/>
      </main>
  )
};

export default Home;
