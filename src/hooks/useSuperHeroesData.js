import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchReactHeroData = async () => {
    //自动抛出error
    const { data } = await axios.get('http://localhost:4000/superheroes');
    return data;
}

//useMutation 回调函数
const addSuperHero = (hero) => axios.post('http://localhost:4000/superheroes', hero);


const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchReactHeroData, {
        onSuccess,
        onError
    });
}

export const useAddHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(
        addSuperHero,
        {
            onSuccess: (data) => {
                //加入成功后refetch superHeroes data
                // queryClient.invalidateQueries('super-heroes');
                //这里的data是response返回的
                queryClient.setQueryData('super-heroes', (oldQueryData) => {
                    //直接通过post请求返回的数据更新query cache 避免多一次的网络请求
                    // console.log(oldQueryData);
                    return [...oldQueryData, data.data]
                });
            }
        }
    )
}


export default useSuperHeroesData;

