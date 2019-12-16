import React, { FunctionComponent, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AbsencePdfDocument from './AbsencePdfDocument'
import { PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@apollo/react-hooks';
import {GET_STUDENT} from '../../queries/StudentQuery';
import StudentInterface from '../../interfaces/Student.interface';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import { useParams} from "react-router";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pdfview: {
      width: '100%',
      height: '80vh'
    },
    progress: {
      margin: theme.spacing(2),
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
  }),
);

interface StudentData {
  student: StudentInterface
}

const AbsencePdf: FunctionComponent = () => {
  const classes = useStyles();
  const {id} = useParams();
  const { loading : queryLoading, error: queryError, data } = useQuery<StudentData>(GET_STUDENT, {variables: {where: {id: id}}});
  const [to, setTo] = useState<moment.Moment>(moment());
  const [from, setFrom] = useState<moment.Moment>(moment().subtract(moment.duration(1, 'month')).add(moment.duration(1,'day')));

  /* LOADING */
  if(queryLoading) return <CircularProgress className={classes.progress} />;

  /* ERROR */
  if(queryError || !data) return  <ServerError/>;

  const {student} = data;

  const handleDateChangeFrom = (date: MaterialUiPickersDate | null) => {
    if(date !== null){
      setFrom(moment(date));
    }
  }

  const handleDateChangeTo = (date: MaterialUiPickersDate | null) => {
    if(date !== null){
      setTo(moment(date));
    }
  }

  return (
    <div>
      {/* FORM */}
      <Grid container>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="DD.MM.YYYY"
                margin="normal"
                id="from"
                label="From"
                value={from}
                onChange={handleDateChangeFrom}
                className={classes.input}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="DD.MM.YYYY"
                margin="normal"
                id="to"
                label="To"
                value={to}
                onChange={handleDateChangeTo}
                className={classes.input}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      {/* PDF */}
      <PDFViewer className={classes.pdfview}>
        <AbsencePdfDocument student={student} from={from} to={to}/> 
      </PDFViewer>
    </div>
  );
}

export default AbsencePdf;