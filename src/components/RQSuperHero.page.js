import React from 'react';
import { useParams } from "react-router-dom";
import useSuperHeroData from "../hooks/useSuperHeroData";

const RQSuperHeroPage = () => {
    const { id } = useParams()

    //使用自定义hook
    const {data, isLoading, isError, error } = useSuperHeroData(id);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>{data.name}</h2>
            <h2>{data.alterEgo}</h2>
        </div>
    );
};

export default RQSuperHeroPage;
