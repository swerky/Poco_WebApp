import React, { FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SelectField from '../../utils/components/SelectField';
import StudentFormBatchProps from '../../interfaces/StudentFormBatch.interface';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  KeyboardDatePicker
} from '@material-ui/pickers';
import BatchesForm from '../Batchs/BatchesForm';
import { useQuery } from '@apollo/react-hooks';
import {BatchClass} from '../../interfaces/Student.interface';
import {GET_BATCHES} from '../../queries/BatchQuery';


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

const StudentFormBatch: FunctionComponent<StudentFormBatchProps> = ({newBatch, setNewBatch, batch, handleTextBatchChange, handleDateBatchChange}) => {
  const classes = useStyles();

  /* GETTING EXISTING BATCH */
  const {loading, error, data} = useQuery(GET_BATCHES);

  /* LOADING */
  if(loading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(error) return  <ServerError/>

  /* CREATION OF THE LIST OF BATCH */
  const suggestions = data.batches.map((batch : BatchClass) => ({
    value: batch.id,
    label: batch.name
  }));

  return (
    <Grid container>
      {!newBatch ?
        <>
          <Grid item xs={11}>
            <SelectField suggestions={suggestions} label="Search batch" placeholder="Search batch name"/>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="add" onClick={() => setNewBatch(!newBatch)}>
              <Tooltip title="Add new batch">
                  <AddIcon />
              </Tooltip>
            </IconButton>
          </Grid>
        </>
      :
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={11}>
              <h2 className={classes.titleNewBatch}>New Batch</h2>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="search" onClick={() => setNewBatch(!newBatch)}>
                <Tooltip title="Search batch">
                    <SearchIcon />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
          <BatchesForm batch={batch} handleTextBatchChange={handleTextBatchChange} handleDateBatchChange={handleDateBatchChange}/>
        </Grid>
      }
    </Grid>
  );
}

export default StudentFormBatch;