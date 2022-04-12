import { useQuery } from "react-query";
import axios from "axios";

const fetchReactHeroData = () => axios.get('http://localhost:4000/superheroes');

//useQuery抓取数据,取代useState+useEffect
export const RQSuperHeroesPage = () => {

  const { isLoading, data } = useQuery("react-heroes",fetchReactHeroData);

  if(isLoading) return <div>Loading...</div>;

  return (
      <>
        <h2>UseQuery React Heroes Page</h2>
        {
          data.data.map(hero => (
              <div key={hero.id}>{hero.name}</div>
          ))
        }
      </>
  )
}
