import React, { useEffect, useState, FunctionComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import StudentInterface from '../../interfaces/Student.interface';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import moment from 'moment';

interface StudentDetailsProps {
  student: StudentInterface,
  open: boolean,
  handleClose: () => void
}

interface StudentDetailsContentProps {
  text1: string,
  text2: any,
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StudentDetails: FunctionComponent<StudentDetailsProps> = ({student, open, handleClose}) => {
  const {firstName, lastName, sexe, privateEmail, pocoEmail, residencePermit, birthday, nationality, addressStreet, addressCity, addressNPA, addressCanton, organisation, socialAssistant, financialParticipation, financialParticipationComment, borrowLaptops, foodCost, presences, batch} = student;

  const StudentDetailsContent :FunctionComponent<StudentDetailsContentProps> = ({text1, text2}) =>{
    if(text2) {
      return (
        <Grid container>
          <Grid item xs={6}>
            {text1}
          </Grid>
          <Grid item xs={6}>
            {text2}
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }

  console.log(birthday);
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition} fullWidth={true} maxWidth="lg">
        <DialogTitle id="form-dialog-title">Absence</DialogTitle>
        <DialogContent>
          <StudentDetailsContent text1="First name" text2={firstName}/>
          <StudentDetailsContent text1="Last name" text2={lastName}/>
          <StudentDetailsContent text1="Sexe" text2={sexe}/>
          <StudentDetailsContent text1="Private email" text2={privateEmail}/>
          <StudentDetailsContent text1="Poco email" text2={pocoEmail}/>
          <StudentDetailsContent text1="ResidencePermit" text2={residencePermit}/>
          <StudentDetailsContent text1="Birthday" text2={birthday ? moment(birthday).format("DD.MM.YYYY"): undefined}/>
          <StudentDetailsContent text1="Nationality" text2={nationality}/>
          <StudentDetailsContent text1="Street" text2={addressStreet}/>
          <StudentDetailsContent text1="City" text2={addressCity}/>
          <StudentDetailsContent text1="NPA" text2={addressNPA}/>
          <StudentDetailsContent text1="Canton" text2={addressCanton}/>
          <StudentDetailsContent text1="Organisation" text2={organisation}/>
          {/*<StudentDetailsContent text1="socialAssistant" text2={socialAssistant}/>*/}
          <StudentDetailsContent text1="Financial participation" text2={financialParticipation}/>
          <StudentDetailsContent text1="Comment" text2={financialParticipationComment}/>
          <StudentDetailsContent text1="borrowLaptops" text2={borrowLaptops? "Yes": "No"}/>
          <StudentDetailsContent text1="Food cost" text2={foodCost}/>
          {/*<StudentDetailsContent text1="batch" text2={batch}/>*/}
        </DialogContent>
        <DialogActions>
          {/* ACTIONS */}
        </DialogActions>
      </Dialog>
  )
}

export default StudentDetails;