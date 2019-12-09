import React, { FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import {BatchClass} from '../../interfaces/Student.interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    selectRow: {
      marginTop: '24px'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    titleNewBatch: {
      marginBottom: '10px',
      marginTop: '10px',
      marginLeft: '5px'
    },
    addField: {
      marginTop: '10px',
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

interface BatchClassProps {
  batch: BatchClass,
  handleTextBatchChange: (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleDateBatchChange: (date: MaterialUiPickersDate | null, name: keyof BatchClass) => void,
}

const BatchesForm: FunctionComponent<BatchClassProps> = ({batch, handleTextBatchChange, handleDateBatchChange}) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="batch.name"
        label="Name"
        onChange={handleTextBatchChange('name')}
        className={classes.input}
        value={batch.name}
        margin="normal" 
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
            margin="normal"
            id="startingTime"
            label="Start Date"
            value={batch.startingTime}
            onChange={(event) => handleDateBatchChange(event, 'startingTime')}
            className={classes.input}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
            margin="normal"
            id="endTime"
            label="End Date"
            value={batch.endTime}
            onChange={(event) => handleDateBatchChange(event, 'endTime')}
            className={classes.input}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default BatchesForm;