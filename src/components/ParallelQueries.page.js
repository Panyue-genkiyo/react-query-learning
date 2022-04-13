import React from 'react';
import { useQuery } from 'react-query';
import useSuperHeroesData from "../hooks/useSuperHeroesData";
import axios from "axios";

const fetchFriendsData = async () => {
    const { data } = await axios.get('http://localhost:4000/friends');
    return data;
}

//并行query尝试 多个query同时使用
const ParallelQueriesPage = () => {

    //别名解决data冲突
    const { data: superHeroes } = useSuperHeroesData()
    const { data: friends }  = useQuery('friends', fetchFriendsData);

    console.log({ friends, superHeroes })

    return (
        <div>
            <h2>try parallel queries</h2>
        </div>
    );
};

export default ParallelQueriesPage;
