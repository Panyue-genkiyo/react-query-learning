import { useQuery } from "react-query";
import axios from "axios";
import {useState} from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, { useAddHeroData } from "../hooks/useSuperHeroesData";


//useQuery抓取数据,取代useState+useEffect
export const RQSuperHeroesPage = () => {


    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");

    // const [ refetchInterval, setRefetchInterval ] = useState(3000);
    const onSuccess = (data) => {
        // console.log('side effect after fetching data successfully',data);
        // if(data.length === 4) setRefetchInterval(false)
    }

    const onError = (error) => {
        // console.log('side effect after encountering an error', error);
        // setRefetchInterval(false)
    }


  //refetch给用户事件提供了一个方便的方式来重新加载数据
    //第一次refetch isloading: true和isFeatching: true
    //后面的再次refecth isloading: false和isFeatching: true //缓存机制 cache
  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //     "super-heroes",
  //     fetchReactHeroData,
  //     {
  //           //cacheTime: 5000, //5s 默认每个query的cache时间为5min
  //           // cacheTime: 1000,
  //           /*
  //             在数据不经常变化的情况下，设置在30s内不会背后refetch数据，真正看到cache数据
  //             超过30s后，在缓冲时间内重新背后refetch最新数据 如此往复
  //            */
  //           //staleTime: 30000, //默认0s 这里单位毫秒
  //           //refetchOnMount: true,  //data is fetched on every time the component is mounted 默认行为 (还可以为always，不管状态是否是stale都会再次请求)
  //           // refetchOnMount: false, //就第一次请求数据，不会再次请求数据
  //           // refetchOnWindowFocus: true //回到application 再次请求
  //           //refetchInterval, //每隔2s请求一次数据 默认false 0s 且当window blur时不会再次请求数据，除非设置refetchIntervalInBackground: true
  //           //refetchIntervalInBackground: true, //默认false
  //           // enabled: false //让它不要在组件加载时就fetch数据 一次都不要 停止自动加载 权利在我
  //          onSuccess,
  //          onError,
  //         //transform data
  //          select: (data) => {
  //              //注意select完成之后才会把data回传到onSuccess回调函数上
  //              return data.map(item => item.name);
  //          }
  //     }
  // );
    const {data, isLoading, isFetching, error, isError, refetch} = useSuperHeroesData(onSuccess, onError)

    const { mutate: addHero } = useAddHeroData()


    //isLoading !== isFetching(初次两者都是true，后面只要在cache time里，isLoading都不会变成true
    //而isFetching会每次背后请求更新cache数据 所以会存在(isLoading: false, isFetching: true)
    //每次回到该组件时都会重新背后加载, 更新cache
    // console.log({isLoading, isFetching})

    const handleAddHeroClick = () => {
        console.log({name, alterEgo});
        if(!name.trim() &&  !alterEgo.trim()) return;
        const hero = {name: name.trim(), alterEgo : alterEgo.trim()};
        addHero(hero);
    }


    if(isLoading || isFetching) return <div>Loading...</div>;

    //如果出错
  if(isError) return <h2>{error.message}</h2>

  return (
      <>
        <h2>UseQuery React Heroes Page</h2>
        <div>
            <div>
                <label htmlFor='name'>name:</label>
                <input
                    type="text"
                    value={name}
                    placeholder='please add name'
                    id='name'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='alterEgo'>alterEgo:</label>
                <input
                    type="text"
                    value={alterEgo}
                    placeholder='please add alterEgo'
                    id='alterEgo'
                    name='alterEgo'
                    onChange={(e) => setAlterEgo(e.target.value)}
                />
            </div>
            <button onClick={handleAddHeroClick}>add hero</button>
        </div>
        {
          data?.map(hero => (
              <div key={hero.id}>
                  <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
              </div>
          ))
        }
          {/*{*/}
          {/*    data?.map(hero => (*/}
          {/*        <div key={hero}>{hero}</div>*/}
          {/*    ))*/}
          {/*}*/}
          <button onClick={refetch}>fetch heroes</button>
      </>
  )
}
