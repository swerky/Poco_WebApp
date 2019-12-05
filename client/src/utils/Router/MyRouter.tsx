import React from "react";
import { Switch, Route } from "react-router-dom";
import Absence from '../../components/Absences/Absence';
import Students from '../../components/Students/Students';
import StudentFormAdd from '../../components/Students/StudentFormAdd';
import StudentFormUpdate from '../../components/Students/StudentFormUpdate';

const MyRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Absence} />
      <Route path="/students" exact component={Students} />
      <Route path="/studentadd" exact component={StudentFormAdd}/>
      <Route path="/studentedit/:id" exact component={StudentFormUpdate}/>
    </Switch>
  );
}

export default MyRouter;