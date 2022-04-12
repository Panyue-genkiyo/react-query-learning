import { useQuery } from "react-query";
import axios from "axios";

const fetchReactHeroData = async () => {
    //自动抛出error
   const { data } = await axios.get('http://localhost:4000/superheroes');
   return data;
}

//useQuery抓取数据,取代useState+useEffect
export const RQSuperHeroesPage = () => {

  const { isLoading, data, isError, error } = useQuery("super-heroes",fetchReactHeroData);

  if(isLoading) return <div>Loading...</div>;

    //如果出错
  if(isError) return <h2>{error.message}</h2>

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
