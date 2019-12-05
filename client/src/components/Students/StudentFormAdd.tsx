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

interface StudentData {
  students: StudentInterface[]
}

interface StudentFormContainerProps {
    id?: string
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

const StudentFormAdd: FunctionComponent<StudentFormContainerProps> = ({ id }) => {
    const classes = useStyles();
    
    /*** Hooks ***/
    const [values, setValues] = useStudent();
    const [newSocialAssistant, setNewSocialAssistant] = useState(false)
    const [newBatch, setNewBatch] = useState(false);
    const [open, setOpen] = React.useState(false);

    /*** Mutation ***/
    const [addStudent, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_STUDENT);
    /*** FUNCTIONS ***/
    /** SEND FORM **/
    /* ADD STUDENT */
    const handleAdd = () => {
        //handleComplete();
        const query = makeDataQuery(values, newBatch, newSocialAssistant);
        addStudent({
            variables: { data: query },
            update(cache, { data: { createStudent } }) {
                const existingStudents = cache.readQuery<StudentData>({
                    query: GET_STUDENTS
                });
                if (existingStudents) {
                    cache.writeQuery<StudentData>({
                        query: GET_STUDENTS,
                        data: {
                            students: [...existingStudents.students, createStudent]
                        },
                    });
                }
            }
        })
            .then(() => setOpen(true))
            .catch(() => setOpen(false))
    }

    /* SNACKBAR HANDLER */
    const handleClose = () => {
        setOpen(false);
    }

    /*** SHOW COMPONENT ***/
    /** ADD **/
    return (
      <div>
        <StudentForm 
          action={handleAdd} 
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