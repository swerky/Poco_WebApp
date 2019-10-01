import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Absence from '../../components/Absence/Absence';

const MyRouter = () => {
  return (
      <Switch>
        <Route path="/" exact component={Absence} />
      </Switch>
  );
}

export default MyRouter;