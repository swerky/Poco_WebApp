import React, { FunctionComponent, useState } from 'react';
import moment from 'moment';
import BatchesForm from './BatchesForm';
import {BatchClass} from '../../interfaces/Student.interface';
import {MaterialUiPickersDate} from '@material-ui/pickers';

const BatchesFormAdd : FunctionComponent = () => {
  const [batch, setBatch] = useState({
    name: "",
    startingTime: moment(),
    endTime: moment()
  })

  /* FUNCTIONS */
  const handleTextBatchChange = (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setBatch({...batch, [name]: event.target.value});
  }

  const handleDateBatchChange = (date: MaterialUiPickersDate | null, name: keyof BatchClass) => {
    if(date !== null){
      setBatch({...batch, [name]: date});
    }
  }

  return (
    <BatchesForm batch={batch} handleTextBatchChange={handleTextBatchChange} handleDateBatchChange={handleDateBatchChange}/>
  );
}

export default BatchesFormAdd;