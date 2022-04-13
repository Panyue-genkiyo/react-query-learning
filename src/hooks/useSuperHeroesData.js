import { useQuery } from "react-query";
import axios from "axios";

const fetchReactHeroData = async () => {
    //自动抛出error
    const { data } = await axios.get('http://localhost:4000/superheroes');
    return data;
}

const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchReactHeroData, {
        onSuccess,
        onError
    });
}


export default useSuperHeroesData;
