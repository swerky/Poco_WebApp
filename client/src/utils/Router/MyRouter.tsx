import React from "react";
import { Switch, Route } from "react-router-dom";
import Absence from '../../components/Absences/Absence';
import Students from '../../components/Students/Students';
import StudentFormAdd from '../../components/Students/StudentFormAdd';
import StudentFormUpdate from '../../components/Students/StudentFormUpdate';
import Batches from "../../components/Batchs/Batches";
import BatchesFormAdd from "../../components/Batchs/BatchesFormAdd"; 

const MyRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Absence} />
      <Route path="/students" exact component={Students} />
      <Route path="/studentadd" exact component={StudentFormAdd}/>
      <Route path="/studentedit/:id" exact component={StudentFormUpdate}/>
      <Route path="/batches" exact component={Batches}/>
      <Route path="/batchadd" exact component={BatchesFormAdd}/>
    </Switch>
  );
}

export default MyRouter;