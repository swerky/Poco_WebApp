import React, { useState, FunctionComponent } from 'react';
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
import StudentInterface from '../../interfaces/Student.interface';
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import StudentDetails from './StudentDetails';


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

interface StudentTableProps {
  students: StudentInterface[],
  handleDeleteStudent: (id: string) => void
}

interface DialogInfoProps {
  student: StudentInterface
}

const StudentsTable : FunctionComponent<StudentTableProps> = (props) => {
  const classes = useStyles();
  const {students, handleDeleteStudent} = props

  /* DIALOG INFO */
  const DialogInfo: FunctionComponent<DialogInfoProps> = ({student}) => {
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    
    const handleInfoStudent = () => {
      setOpenInfoDialog(true);
    }

    const handleInfoStudentClose = () => {
      setOpenInfoDialog(false);
    }

    return (
      <>
        <IconButton className={classes.button} aria-label="info" onClick={() => handleInfoStudent()}>
          <InfoIcon />
        </IconButton>
        <StudentDetails student={student} open={openInfoDialog} handleClose={handleInfoStudentClose}/>
      </>
    );
  }

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
            <Link to="studentadd">
              <PersonAdd/>
            </Link>
          </Tooltip>
        </div>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow key="metadata">
            <TableCell key="studentFirstname">First Name</TableCell>
            <TableCell key="studentLastName">Last Name</TableCell>
            <TableCell key="studentEmail">Email</TableCell>
            <TableCell key="studentBirthday">Birthday</TableCell>
            <TableCell key="studentBatch">Batch</TableCell>
            <TableCell key="studentAbsence">Absence</TableCell>
            <TableCell key="studentActions">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student : StudentInterface) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" key={"firstname_" + student.id}>
                {student.firstName}
              </TableCell>
              <TableCell component="th" scope="row" key={"lastname_" + student.id}>
                {student.lastName}
              </TableCell>
              <TableCell component="th" scope="row" key={"privateemail_" + student.id}>
                {student.privateEmail}
              </TableCell>
              {student.birthday && 
              <TableCell component="th" scope="row" key={"birthday_" + student.id}>
                <Tooltip title="format: dd.mm.yyy" aria-label="date">
                  <span>
                    {moment(student.birthday).format('DD.MM.YYYY')}
                  </span>
                </Tooltip>
              </TableCell>}
              {student.batch && 
              <TableCell component="th" scope="row" key={"batch_" + student.id}>
                {student.batch.name}
              </TableCell>}
              <TableCell component="th" scope="row" key={"presence_" + student.id}>
                {student.presences ? student.presences.length : 0}
              </TableCell>
              <TableCell component="th" scope="row" key={"name_actions_" + student.id}>
                <Tooltip key={"ToolTip_Edit_" + student.id} title="Edit" aria-label="edit">
                  <IconButton className={classes.button} aria-label="edit">
                    <Link to={"studentEdit/" + student.id}>
                      <EditIcon/>
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip key={"ToolTip_Remove_" + student.id} title="Remove" aria-label="remove">
                  <IconButton className={classes.button} aria-label="remove" onClick={() => handleDeleteStudent(student.id as string)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip key={"ToolTip_info_" + student.id} title="Info" aria-label="info">
                  <DialogInfo student={student}/>
                </Tooltip>
                <Tooltip key={"ToolTip_print_" + student.id} title="Print" aria-label="remove">
                  <Link to={"/absencepdf/" + student.id}>
                    <IconButton className={classes.button}>
                      <PrintIcon />
                    </IconButton>
                  </Link>
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