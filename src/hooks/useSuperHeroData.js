//请求hero详情页数据自定义hook
import { useQuery } from "react-query";
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
    return useQuery(["superhero", id], fetchSuperHeroDetail, {
        enabled: !!id, //当id存在是才执行
    });
}

export default useSuperHeroData
