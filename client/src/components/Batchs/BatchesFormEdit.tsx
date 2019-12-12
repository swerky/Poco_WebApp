import React, { FunctionComponent, useState } from 'react';
import {BatchClass} from '../../interfaces/Student.interface';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_BATCH, GET_BATCHES } from '../../queries/BatchQuery';
import BatchesDialog from './BatchesDialog';
import EditIcon from '@material-ui/icons/Edit';

interface BatchData {
  batches: BatchClass[]
}

interface BatchesFormEditProps {
  batch: BatchClass
}

/* BATCH FORM ADD */
const BatchesFormEdit : FunctionComponent<BatchesFormEditProps> = ({batch: oldBatch}) => {
  const [batch, setBatch] = useState(oldBatch);

  /* MUTATION */
  const [updateBatch, {loading: mutationLoading, error: mutationError}] = useMutation(UPDATE_BATCH);

  const handleSubmit = () => {
    updateBatch({
      variables: { data: batch, id: batch.id },
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
      <BatchesDialog batch={batch} handleChangeBatch={handleChangeBatch} handleSubmit={handleSubmit} loading={mutationLoading} icon={<EditIcon/>}/>
    </>
  );
}

export default BatchesFormEdit;