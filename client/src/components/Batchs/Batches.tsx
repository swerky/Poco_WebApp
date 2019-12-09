import React, { FunctionComponent, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import BatchesTable from './BatchesTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import { useQuery } from '@apollo/react-hooks';
import {GET_BATCHES} from '../../queries/BatchQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const Batches : FunctionComponent = () => {
  const classes = useStyles();

  /* GETTING EXISTING BATCH */
  const {loading, error, data} = useQuery(GET_BATCHES);

  /* LOADING */
  if(loading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(error) return  <ServerError/>

  if(data.batches){
    return (
      <BatchesTable batches={data.batches}/>
    );
  } else {
    return <h1>No batches yet</h1>
  }
}

export default Batches;