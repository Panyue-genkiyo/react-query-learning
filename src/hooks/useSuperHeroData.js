//请求hero详情页数据自定义hook
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const fetchSuperHeroDetail = async ({ queryKey }) => {
    const id = queryKey[1]; //自动将key传入
    const { data } = await axios.get(`http://localhost:4000/superheroes/${id}`);
    return data;
}

const useSuperHeroData = (id) => {
    // return useQuery(["superhero", id], () => fetchSuperHeroDetail(id), {
    //     enabled: !!id, //当id存在是才执行
    // });
    const queryClient = useQueryClient();
    return useQuery(["superhero", id], fetchSuperHeroDetail, {
        enabled: !!id, //当id存在是才执行
        //不会change loading状态到true
        initialData: () => {
            const hero = queryClient.getQueryData('super-heroes')?.find(hero => hero.id === +id);
            if(hero) return { hero }
            else return undefined;
        }
    });
}

export default useSuperHeroData
