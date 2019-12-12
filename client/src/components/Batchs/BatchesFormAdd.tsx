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
import BatchesDialog from './BatchesDialog';

interface BatchData {
  batches: BatchClass[]
}

/* BATCH FORM ADD */
const BatchesFormAdd : FunctionComponent = () => {
  const [batch, setBatch] = useState<BatchClass>({
    name: "",
    startingTime: moment(),
    endTime: moment()
  })

  /* MUTATION */
  const [addBatch, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_BATCH);

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
    });
  }

  const handleChangeBatch = (newBatch: BatchClass) => {
    setBatch(newBatch);
  }

  return (
    <>
      <BatchesDialog batch={batch} handleChangeBatch={handleChangeBatch} handleSubmit={handleSubmit} loading={mutationLoading} icon={<AddIcon/>}/>
    </>
  );
}

export default BatchesFormAdd;