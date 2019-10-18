import React from "react";
import { Switch, Route } from "react-router-dom";
import Absence from '../../components/Absences/Absence';
import Students from '../../components/Students/Students';
import StudentForm from '../../components/Students/StudentForm';

const MyRouter = () => {
  return (
      <Switch>
        <Route path="/" exact component={Absence} />
        <Route path="/students" exact component={Students} />
        <Route path="/studentform" exact component={StudentForm} />
      </Switch>
  );
}

export default MyRouter;