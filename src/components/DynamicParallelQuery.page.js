import React from 'react';
import { useQueries } from "react-query";
import { fetchSuperHeroDetail } from "../hooks/useSuperHeroData";


//不确定次数的多次并行query
const DynamicParallelQueryPage = ({ ids }) => {

    const datas = useQueries(
        ids.map(id => ({
            queryKey: ['superhero', id],
            queryFn: fetchSuperHeroDetail,
        }))
    );

    console.log(datas);

    return (
        <div>
            <h2>Dynamic Parallel Query</h2>
        </div>
    );
};

export default DynamicParallelQueryPage;
