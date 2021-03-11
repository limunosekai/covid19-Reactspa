import './App.css';
import { Fragment } from 'react';

import Header from './components/header/Header';
import Statistic from './components/contents/statistics/Statistic';

function App() {
  return (
    <Fragment>
      <Header />
      <Statistic />
    </Fragment>
  );
}

export default App;
