import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelQueryPage from "./components/DynamicParallelQuery.page";
import DependentQueriesPage from "./components/DependentQueries.page";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/parallel-queries'>Parallel Queries</Link>
            </li>
            <li>
              <Link to='/dynamic-parallel-queries'>Dynamic Parallel Queries</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/dependent-queries'>
            <DependentQueriesPage email={'vishwas@example.com'}/>
          </Route>
          <Route path='/dynamic-parallel-queries'>
            <DynamicParallelQueryPage ids={[1,3]}/>
          </Route>
          <Route path='/parallel-queries'>
            <ParallelQueriesPage/>
          </Route>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes/:id'>
            <RQSuperHeroPage/>
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
