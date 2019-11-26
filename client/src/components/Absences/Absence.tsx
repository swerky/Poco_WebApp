import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AbsenceTable from './AbsenceTable';
import StudentInterface, {StudentAbsence, StudentData, PresenceInterface} from '../../interfaces/Student.interface';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {GET_STUDENTS, DELETE_STUDENT} from '../../queries/StudentQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import moment from 'moment';
import round from 'lodash/round';

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
  }),
);

const Absence : FunctionComponent = () => {
  const classes = useStyles();
  const { loading : queryLoading, error: queryError, data } = useQuery<StudentData>(GET_STUDENTS);
  
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

  const formatDate = (presence: PresenceInterface) => {
    return {
      ...presence,
      dateStart: moment(presence.dateStart),
      dateEnd: moment(presence.dateEnd)
    };
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
      <AbsenceTable students={studentsAbsence}/>
    </>
  );
}

export default Absence;