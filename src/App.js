import './App.css';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Statistic from './components/contents/statistics/Statistic';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/' exact component={Statistic} />
      </Switch>
    </Fragment>
  );
}

export default App;
