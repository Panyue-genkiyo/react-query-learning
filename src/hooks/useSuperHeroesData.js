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
            // onSuccess: (data) => {
            //     //加入成功后refetch superHeroes data
            //     // queryClient.invalidateQueries('super-heroes');
            //     //这里的data是response返回的
            //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
            //         //直接通过post请求返回的数据更新query cache 避免多一次的网络请求
            //         // console.log(oldQueryData);
            //         return [...oldQueryData, data.data]
            //     });
            // }
            onMutate: async (newHero) => {
                //这个函数接收到的参数和addSuperHero是一样的注意
                await queryClient.cancelQueries('super-heroes');
                const previousHeroData = await queryClient.getQueryData('super-heroes'); //cached data
                queryClient.setQueryData('super-heroes', (oldQueryData) => {
                    //直接通过post请求返回的数据更新query cache 避免多一次的网络请求
                    // console.log(oldQueryData);
                    return [...oldQueryData, { id: oldQueryData.length + 1, ...newHero }];
                });
                // return {
                //     previousHeroData,
                // }
                return () => queryClient.setQueryData('super-heroes', previousHeroData); //这里的回传直接变成onError第三个参数
            },
            onError: (error, _hero, context) => {
                //mutate error的时候触发该回调函数
                //在context对象上我们可以接到上面onMutate函数所返回的previousHeroData，方便我们回滚数据
                // queryClient.setQueryData('super-heroes', context.previousHeroData);
                console.error(error);
                if(context) context();
            },
            onSettled: () => {
                //这个函数在mutation完成后(不管成功还是失败)触发，可以在这里做一些清理工作
                //一般refetch data
                queryClient.invalidateQueries('super-heroes');
            }
        }
    )
}


export default useSuperHeroesData;

