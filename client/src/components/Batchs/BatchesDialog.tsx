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

interface BatchDialogProps {
  handleSubmit: () => void,
  handleChangeBatch: (batch: BatchClass) => void,
  batch: BatchClass,
  loading: boolean
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* BATCH FORM ADD */
const BatchesDialog : FunctionComponent<BatchDialogProps> = ({batch, handleSubmit, handleChangeBatch, loading}) => {
  const [openDialog, setOpenDialog] = useState(false);

  /* FUNCTIONS */
  const handleTextBatchChange = (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    handleChangeBatch({...batch, ["name"]: event.target.value});
  }

  const handleDateBatchChange = (date: MaterialUiPickersDate | null, name: keyof BatchClass) => {
    if(date !== null){
      handleChangeBatch({...batch, [name]: date});
    }
  }

  const handleClose = () =>{
    setOpenDialog(false);
  }
  
  const handleOpen = () => {
    setOpenDialog(true);
  }

  return (
    <>
    <AddIcon onClick={handleOpen}/>
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">Add Batch</DialogTitle>
      <DialogContent>
        {loading ?  
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

export default BatchesDialog;