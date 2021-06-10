import './App.css';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Statistic from './components/contents/statistics/Statistic';
import FloatingList from './components/FloatingList/FloatingList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/' exact component={Statistic} />
        <Route path='/floating-list' exact component={FloatingList} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;
