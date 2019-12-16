import React, { FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {MyDocument} from '../../services/Absence.services'
import { PDFViewer } from '@react-pdf/renderer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pdfview: {
      width: '100%',
      height: '85vh'
    },
  }),
);

const AbsencePdf : FunctionComponent = () => {
  const classes = useStyles();

  return (
    <PDFViewer className={classes.pdfview}>
      <MyDocument/> 
    </PDFViewer>
  );
}

export default AbsencePdf;