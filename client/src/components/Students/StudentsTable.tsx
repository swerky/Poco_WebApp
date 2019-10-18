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
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import StudentInterface from '../../interfaces/Student.interface';
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

/* GRAPHQL REQUEST */
const GET_STUDENTS = gql`
  {
    students{
      id
      firstName
      lastName
      privateEmail
      birthday
      financialParticipation
      borrowLaptops
      foodCost
      presences {
        id
        date
        timeMissed
        goodExcuse
        reason
      }
      batch {
        name
      }
    }
  }
`;

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
    progress: {
      margin: theme.spacing(2),
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

const StudentsTable : FunctionComponent = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_STUDENTS);

  /* LOADING */
  if(loading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(error) return  <ServerError/>

  console.log(data);

  /* SHOW COMPONENT */
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Students
          </Typography>
        </div>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          <Tooltip title="Add Student" aria-label="add student">
            <Link to="studentForm">
              <PersonAdd/>
            </Link>
          </Tooltip>
        </div>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow key="metadata">
            <TableCell key="studentFirstname">Firstname</TableCell>
            <TableCell key="studentLastName">Name</TableCell>
            <TableCell key="studentEmail">Email</TableCell>
            <TableCell key="studentBirthday">Birthday</TableCell>
            <TableCell key="studentBatch">Batch</TableCell>
            <TableCell key="studentActions">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.students.map((student : StudentInterface) => (
            <TableRow key={student.firstName}>
              <TableCell component="th" scope="row" key={"name_" + student.firstName + "_" + student.id}>
                {student.firstName}
              </TableCell>
              <TableCell component="th" scope="row" key={"name_" + student.lastName + "_" + student.id}>
                {student.lastName}
              </TableCell>
              <TableCell component="th" scope="row" key={"name_" + student.privateEmail + "_" + student.id}>
                {student.privateEmail}
              </TableCell>
              {student.birthday && 
              <TableCell component="th" scope="row" key={"name_" + student.birthday + "_" + student.id}>
                <Tooltip title="format: dd.mm.yyy" aria-label="date">
                  <span>
                    {moment(student.birthday).format('DD.MM.YYYY')}
                  </span>
                </Tooltip>
              </TableCell>}
              {student.batch && 
              <TableCell component="th" scope="row" key={"name_" + student.batch + "_" + student.id}>
                {student.batch.name}
              </TableCell>}
              <TableCell component="th" scope="row" key={"name_actions_" + student.id}>
                <Tooltip title="Edit" aria-label="edit">
                  <IconButton className={classes.button} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove" aria-label="remove">
                  <IconButton className={classes.button} aria-label="remove">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default StudentsTable;