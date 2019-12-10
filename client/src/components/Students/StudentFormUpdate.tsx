import React, { useEffect, useState, FunctionComponent } from 'react';
import StudentForm from './StudentForm';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import StudentInterface from '../../interfaces/Student.interface';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_STUDENT, GET_STUDENTS, GET_STUDENT, UDPATE_STUDENT } from '../../queries/StudentQuery';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import { useStudent } from './Students.hooks';
import makeDataQuery from '../../services/Student.services';
import {
  useParams
} from "react-router-dom";

interface StudentData {
  student: StudentInterface
}

interface StudentsData {
  students: StudentInterface[]
}

interface NotificationSnackbarProps {
  open: boolean,
  handleClose: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successSnackBar: {
      backgroundColor: green[600],
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const NotificationSnackbar: FunctionComponent<NotificationSnackbarProps> = ({ open, handleClose}) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.successSnackBar}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)} />
            Student created
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      /> 
    </Snackbar>
  );
}

const StudentFormAdd: FunctionComponent = () => {
    const { id } = useParams();
    const classes = useStyles();
    
    /*** Hooks ***/
    const [newSocialAssistant, setNewSocialAssistant] = useState(false)
    const [newBatch, setNewBatch] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useStudent();
    const [redirect, setRedirect] = useState(false);
    /*** Mutation ***/
    const [udpateStudent, {loading: updateLoading, error: updateError}] = useMutation(UDPATE_STUDENT);
    
    /*** QUERY ***/
    const { loading : queryLoading, error: queryError, data } = useQuery<StudentData>(GET_STUDENT, {variables: {where:{id: id}}});
    //console.log(data);
    if(queryLoading) return <CircularProgress className={classes.progress} />;
    if(queryError) return <ServerError/>;
    if(!data)  {
      return <h1>No data with this student id</h1>
    } else if(values.id === undefined){
      //console.log(values);
      setValues(data.student);
    }

    /*** FUNCTIONS ***/
    /* UPDATE STUDENT */
    const handleUpdate = () => {
      const query = makeDataQuery(values, newBatch, newSocialAssistant);
      udpateStudent({
        variables: {data: query, where: { id: id}},
        update(cache, { data: { updateStudent } }) {
          const existingStudent = cache.readQuery<StudentsData>({
              query: GET_STUDENTS
          });
          if (existingStudent) {
            let listStudents = existingStudent.students;
            listStudents.map((student) => student.id === updateStudent.id ? updateStudent : student);
            cache.writeQuery<StudentsData>({
              query: GET_STUDENTS,
              data: {
                  students: listStudents
              },
            });
          }
      }
      }).then(() => {setRedirect(true);})
    }

    /* SNACKBAR HANDLER */
    const handleClose = () => {
        setOpen(false);
    }

    /* REDIRECT */
    if(redirect) return <Redirect to="/students"/>

    /*** SHOW COMPONENT ***/
    /** UPDATE **/
    return (
      <div>
        <StudentForm 
          action={handleUpdate} 
          values={values} 
          setValues={setValues} 
          newSocialAssistant={newSocialAssistant}
          setNewSocialAssistant={setNewSocialAssistant}
          newBatch={newBatch}
          setNewBatch={setNewBatch}
        />
        <NotificationSnackbar open={open} handleClose={handleClose}/>
      </div>
    );
}

export default StudentFormAdd;
