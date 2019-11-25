import React, { FunctionComponent, useState } from 'react';
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
import {StudentAbsence} from '../../interfaces/Student.interface';
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment'
import AbsenceDialog from './AbsenceDialog';

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

interface AbscenceTableProps {
  students: StudentAbsence[]
}

interface EditButtonProps {
  id: string,
  firstName: string,
  lastName: string
}

const EditButton: FunctionComponent<EditButtonProps> = ({id, firstName, lastName}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /* FUNCTIONS */
  const handleOpenDialog = () => {
    setOpen(true);
    console.log(open);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add Absence" aria-label="addAbsence">
        <IconButton className={classes.button} aria-label="edit" onClick={handleOpenDialog}>
          <AccessTimeIcon />
        </IconButton>
      </Tooltip>
      {/* ADD ABSENCE */}
      <AbsenceDialog key={"dialog_" + id} open={open} handleClose={handleCloseDialog} id={id} firstName={firstName} lastName={lastName}/>
    </>  
  );
}

const StudentsTable : FunctionComponent<AbscenceTableProps> = (props) => {
  const classes = useStyles();
  const {students} = props;

  /* SHOW COMPONENT */
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Students Absence
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
            <TableCell key="studentNbAbsence">Nb Absences</TableCell>
            <TableCell key="studentTimeMissedAbsence">Time missed</TableCell>
            <TableCell key="studentPourcentAbscence">Pourcentage presence</TableCell>
            <TableCell key="studentActions">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student : StudentAbsence) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" key={"firstname_" + student.id}>
                {student.firstName}
              </TableCell>
              <TableCell component="th" scope="row" key={"lastname_" + student.id}>
                {student.lastName}
              </TableCell>
              <TableCell component="th" scope="row" key={"nbAbsence_" + student.id}>
                {student.nbAbsence}
              </TableCell>
              <TableCell component="th" scope="row" key={"timeMissed_" + student.id}>
                {student.timeMissed} h
              </TableCell>
              <TableCell component="th" scope="row" key={"pourcentage_" + student.id}>
                {student.pourcentage + "%"}
              </TableCell>
              <TableCell component="th" scope="row" key={"actions_" + student.id}>
                <EditButton id={student.id!} firstName={student.firstName!} lastName={student.lastName!}/>  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default StudentsTable;