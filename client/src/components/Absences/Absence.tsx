import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AbsenceTable from './AbsenceTable';
import StudentInterface, {StudentAbsence, StudentData, PresenceInterface} from '../../interfaces/Student.interface';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {GET_STUDENTS} from '../../queries/StudentQuery';
import {DELETE_ABSENCE} from '../../queries/AbsenceQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ServerError from '../../utils/Errors/ServerError';
import { green } from '@material-ui/core/colors';
import moment from 'moment';
import round from 'lodash/round';
import classNames from 'classnames';

/* CONST */
const NB_HOURS_DAY = 7;
const NB_DAY_WEEK = 5;
const NB_WEEKS = 13;
const TIME_BATCH = NB_HOURS_DAY * NB_DAY_WEEK * NB_WEEKS * 60;

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
    successSnackBar: {
      backgroundColor: green[600],
    },
    errorSnackBar: {
      backgroundColor: theme.palette.error.dark,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
  }),
);

const Absence : FunctionComponent = () => {
  const classes = useStyles();
  const { loading : queryLoading, error: queryError, data } = useQuery<StudentData>(GET_STUDENTS);
  const [deleteAbsence, {loading: mutationLoading, error: mutationError}] = useMutation(DELETE_ABSENCE);
  const [openSnackBarValidate, setOpenSnackBarValidate] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Absence`;
  });

  /* METHODS */
  const getPourcentageAbsence = (student: StudentInterface) => {
    return round((TIME_BATCH - getTimeMissed(student)) / TIME_BATCH * 100,2);
  }

  const getTimeMissed = (student: StudentInterface) => {
    const reducer = (accumulator: number, presence: PresenceInterface) => accumulator + moment.duration(presence.dateEnd.diff(presence.dateStart)).asHours();
    return student.presences ? student.presences.reduce((reducer), 0) : 0;
  }

  const handleDeleteAbsence = (id: string) => {
    deleteAbsence({
      variables: {where: {id: id}},
      update(cache, {data: {deletePresence}}){
        console.log(deletePresence)
        const existingStudents = cache.readQuery<StudentData>({ query: GET_STUDENTS });
        if(existingStudents){
          const newStudents = existingStudents.students.map((student) => {
            if(student.presences){
              student.presences = student.presences.filter(presence => presence.id !== deletePresence.id);
            }
            return student;
          });
          console.log(newStudents);
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { students:  newStudents},
          });
        }
      }
    })
    .then(() => setOpenSnackBarValidate(true))
    .catch(() =>  setOpenSnackBarError(true));
  }

  const formatDate = (presence: PresenceInterface) => {
    return {
      ...presence,
      dateStart: moment(presence.dateStart),
      dateEnd: moment(presence.dateEnd)
    };
  }

  /* SNACKBAR FUNCTION*/
  const handleCloseSnackBarValidate = () => {
    setOpenSnackBarValidate(false);
  }
  /* SNACKBAR FUNCTION*/
  const handleCloseSnackBarError = () => {
    setOpenSnackBarError(false);
  }


  /* LOADING */
  if(queryLoading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(queryError) return  <ServerError/>

  /* MODIFIED DATA */
  /* A reflechir si faire une query différente*/
  const studentsAbsence : StudentAbsence[] = data ? 
    data.students.map((student) => {
      student.presences = student.presences ? student.presences.map(formatDate): null;
      return (
        {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          presences: student.presences,
          batch: student.batch,
          pourcentage: getPourcentageAbsence(student),
          timeMissed: getTimeMissed(student),
          nbAbsence: student.presences ? student.presences.length : 0
        }
      );
    }) : [];

  /* SHOW COMPONENT */
  return (
    <>
      <h1>Absence</h1>
      <AbsenceTable students={studentsAbsence} handleDeleteAbsence={handleDeleteAbsence}/>
      {/* SNACKBAR */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackBarValidate}
        autoHideDuration={6000}
        onClose={handleCloseSnackBarValidate}
      >
        <SnackbarContent
          className={classes.successSnackBar}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)} />
              Delete Absence done with sucess
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseSnackBarValidate}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackBarError}
        autoHideDuration={6000}
        onClose={handleCloseSnackBarError}
      >
        <SnackbarContent
          className={classes.errorSnackBar}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)} />
              We rencontred an error while deleting this absence. Please reload the page and try again.
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseSnackBarValidate}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </>
  );
}

export default Absence;