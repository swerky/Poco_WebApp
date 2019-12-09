import React, { FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { BatchClass } from '../../interfaces/Student.interface';
import BatchesFormAdd from './BatchesFormAdd';

/* STYLES */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface BatchesTableProps {
  batches: BatchClass[]
}

const BatchesTable : FunctionComponent<BatchesTableProps> = ({batches}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Batches
          </Typography>
        </div>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          <Tooltip title="Add Batch" aria-label="add batch">
            <BatchesFormAdd/>
          </Tooltip>
        </div>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow key="metadata">
            <TableCell key="batchName">Name</TableCell>
            <TableCell key="batchStartingTime">Starting time</TableCell>
            <TableCell key="batchEndTime">End Time</TableCell>
            <TableCell key="batchActions">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batches.map((batch : BatchClass) => (
            <TableRow key={batch.id!}>
              <TableCell component="th" scope="row" key={"name_" + batch.id}>
                {batch.name}
              </TableCell>
              <TableCell component="th" scope="row" key={"startingTime_" + batch.id}>
                {moment(batch.startingTime).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell component="th" scope="row" key={"endTIme_" + batch.id}>
                {moment(batch.endTime).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell component="th" scope="row" key={"name_actions_" + batch.id}>
                <Tooltip key={"ToolTip_Edit_" + batch.id} title="Edit" aria-label="edit">
                  <IconButton className={classes.button} aria-label="edit">
                    <Link to={"batchEdit/" + batch.id}>
                      <EditIcon/>
                    </Link>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default BatchesTable;