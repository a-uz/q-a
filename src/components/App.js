import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Questions from './Questions';
import Question from './Question';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';

import '../styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={Questions} />
            <Route exact path="/questions/new" component={NewQuestion} />
            <Route exact path="/questions/:id" component={Question} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
