import React, { useState } from 'react';
import axios from "axios";
import { useQuery } from "react-query";

//返回Promise就行
const fetchColorData = (page, limit) => axios.get(`http://localhost:4000/colors?_limit=${limit}&_page=${page}`);

//pagination queries use useQuery hook
const PaginationQueriesPage = () => {

    const [page, setPage] = useState(1);
    const [limit,] = useState(2);
    const { isLoading, isError, data, error, isFetching } = useQuery(
        ['colors', page, limit],
        () => fetchColorData(page, limit),
        {
            //不会在每次分页请求中修改loading为true，而变为背后加载修改isFetching为true,本次分页的数据还是为上一次的数据，在请求还未成功的情况下
            keepPreviousData: true, //queryKey即使改变了，配置这个属性它还是会保留上一次success的data，直到本次请求成功
        }
    );


    if(isLoading) return <p>Loading...</p>

    if(isError) return <p>Error: {error.message}</p>

    return (
        <>
            <div>
                {data?.data.map(color => (
                    <div key={color.id}>
                        <h3>{color.id}-{color.label}</h3>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>
                    上一页
                </button>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page === 4}>
                    下一页
                </button>
                { isFetching && 'loading...' }
            </div>
        </>
    );
};

export default PaginationQueriesPage;
