import { useQuery } from "react-query";
import axios from "axios";

const fetchReactHeroData = async () => {
    //自动抛出error
   const { data } = await axios.get('http://localhost:4000/superheroes');
   return data;
}

//useQuery抓取数据,取代useState+useEffect
export const RQSuperHeroesPage = () => {

  const { isLoading, data, isError, error, isFetching } = useQuery(
      "super-heroes",
      fetchReactHeroData,
      // {
      //     cacheTime: 5000, //5s 默认每个query的cache时间为5min
      // }
  );

  if(isLoading) return <div>Loading...</div>;

    //如果出错
  if(isError) return <h2>{error.message}</h2>

    //isLoading !== isFetching(初次两者都是true，后面只要在cache time里，isLoading都不会变成true
    //而isFetching会每次背后请求更新cache数据 所以会存在(isLoading: false, isFetching: true)
    //每次回到该组件时都会重新背后加载, 更新cache
    console.log({isLoading, isFetching})

  return (
      <>
        <h2>UseQuery React Heroes Page</h2>
        {
          data.map(hero => (
              <div key={hero.id}>{hero.name}</div>
          ))
        }
      </>
  )
}
