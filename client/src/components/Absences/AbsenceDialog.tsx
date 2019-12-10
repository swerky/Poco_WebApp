import React, { FunctionComponent, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DateFnsUtils from '@date-io/moment';
import StudentInterface, { PresenceInterface } from '../../interfaces/Student.interface';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { useMutation } from '@apollo/react-hooks';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import { ADD_ABSENCE } from '../../queries/AbsenceQuery';
import { GET_STUDENTS } from '../../queries/StudentQuery';

interface AbsenceDialogProps {
  open: boolean,
  id: string,
  firstName: string,
  lastName: string,
  handleClose: () => void
}

interface StudentCacheResult {
  students: StudentInterface[] | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
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

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AbsenceDialog: FunctionComponent<AbsenceDialogProps> = ({ open, id, firstName, lastName, handleClose, }) => {
  const classes = useStyles();
  const [dateStart, setSelectedDateStart] = useState(moment().hours(9).minutes(0).seconds(0).milliseconds(0));
  const [dateEnd, setSelectedDateEnd] = useState(moment().hours(17).minutes(0).seconds(0).milliseconds(0));
  const [goodExcuse, setgoodExcuse] = useState(false);
  const [reason, setReason] = useState('');
  const [openSnackBarValidate, setOpenSnackBarValidate] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [addAbsence, { loading: mutationLoading, error: mutationError }] =
    useMutation(
      ADD_ABSENCE,
      {
        update(cache, { data: { createPresence } }) {
          let students = cache.readQuery<StudentCacheResult>({ query: GET_STUDENTS })!.students;
          if (students) {
            console.log("updating cache...");
            students.map((student) => {
              if (student.id === id) {
                if (student.presences) {
                  student.presences.push(createPresence);
                } else {
                  student.presences = [createPresence];
                }
              }
              /*console.log(student.firstName);
              console.log(student.presences);*/
            });
            cache.writeQuery({
              query: GET_STUDENTS,
              data: { students: students },
            });
          }
        }
      }
    );

  const handleDateStartChange = (date: MaterialUiPickersDate | null) => {
    if (date !== null) {
      setSelectedDateStart(moment(date));
    }
  };

  const handleDateEndChange = (date: MaterialUiPickersDate | null) => {
    if (date !== null) {
      setSelectedDateEnd(moment(date));
    }
  };

  const handleSubmit = () => {
    let query = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      goodExcuse: goodExcuse,
      reason: reason,
      student: {
        connect: {
          id: id
        }
      }
    }
    addAbsence({ variables: { data: query } })
    .then(() => setOpenSnackBarValidate(true))
    .catch(() => setOpenSnackBarError(true));
    handleClose();
  }

  /* SNACKBAR FUNCTION*/
  const handleCloseSnackBarValidate = () => {
    setOpenSnackBarValidate(false);
  }

  const handleCloseSnackBarError = () => {
    setOpenSnackBarError(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">Absence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an absence for {firstName} {lastName}.
        </DialogContentText>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  variant="inline"
                  format="DD.MM.YYYY"
                  margin="normal"
                  id="absenceDateFrom"
                  label="From (date)"
                  value={dateStart}
                  onChange={handleDateStartChange}
                  className={classes.input}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  required
                  margin="normal"
                  id="AbsenceTimeFrom"
                  label="From (time)"
                  value={dateStart}
                  onChange={handleDateStartChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  variant="inline"
                  format="DD.MM.YYYY"
                  margin="normal"
                  id="AbsenceDateTo"
                  label="To (date)"
                  value={dateEnd}
                  onChange={handleDateEndChange}
                  className={classes.input}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  required
                  margin="normal"
                  id="AbsenceTimeTo"
                  label="To (Time)"
                  value={dateEnd}
                  onChange={handleDateEndChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container alignItems="flex-end">
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch checked={goodExcuse} onChange={() => setgoodExcuse(!goodExcuse)} value="goodExcuse" />
                  }
                  label="Good reason"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="reason"
                className={classes.textField}
                label="Reason"
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
        </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
        </Button>
        </DialogActions>
      </Dialog>
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
              Added absence successfully
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
              We rencontred an error while adding this absence. Please reload the page and try again.
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

export default AbsenceDialog;