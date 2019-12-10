import React, { FunctionComponent, useState } from 'react';
import moment from 'moment';
import BatchesForm from './BatchesForm';
import {BatchClass} from '../../interfaces/Student.interface';
import {MaterialUiPickersDate} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BATCH, GET_BATCHES } from '../../queries/BatchQuery';

interface BatchData {
  batches: BatchClass[]
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* BATCH FORM ADD */
const BatchesFormAdd : FunctionComponent = () => {
  const [batch, setBatch] = useState({
    name: "",
    startingTime: moment(),
    endTime: moment()
  })
  const [openDialog, setOpenDialog] = useState(false);

  /* MUTATION */
  const [addBatch, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_BATCH);

  /* FUNCTIONS */
  const handleTextBatchChange = (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setBatch({...batch, ["name"]: event.target.value});
  }

  const handleDateBatchChange = (date: MaterialUiPickersDate | null, name: keyof BatchClass) => {
    if(date !== null){
      setBatch({...batch, [name]: date});
    }
  }

  const handleClose = () =>{
    setOpenDialog(false);
  }
  
  const handleOpen = () => {
    setOpenDialog(true);
  }

  /* A TESTER */
  const handleSubmit = () => {
    addBatch({
      variables: { data: batch },
      update(cache, { data: { createBatch } }) {
        const existingBatches = cache.readQuery<BatchData>({
            query: GET_BATCHES
        });
        console.log(existingBatches);
        if (existingBatches) {
          cache.writeQuery<BatchData>({
            query: GET_BATCHES,
            data: {
              batches: [...existingBatches.batches, createBatch]
            },
          });
        }
      }
    }).then(handleClose);
  }

  return (
    <>
    <AddIcon onClick={handleOpen}/>
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">Add Batch</DialogTitle>
      <DialogContent>
        {mutationLoading ?  
          <CircularProgress/>
        :
          <>
            <DialogContentText>
              Add a batch.
            </DialogContentText>
            <BatchesForm batch={batch} handleTextBatchChange={handleTextBatchChange} handleDateBatchChange={handleDateBatchChange}/>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Add
                </Button>
              </DialogActions>
            </>
          }
      </DialogContent>
    </Dialog>
    </>
  );
}

export default BatchesFormAdd;