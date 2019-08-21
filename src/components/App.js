import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Questions from './Questions';
import Question from './Question';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Questions} />
          <Route exact path="/questions/new" component={NewQuestion} />
          <Route exact path="/questions/:id" component={Question} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
