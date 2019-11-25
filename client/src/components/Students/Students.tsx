import React, { FunctionComponent, useEffect } from 'react';
import StudentsTable from './StudentsTable';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import StudentInterface, {StudentData} from '../../interfaces/Student.interface';
import {GET_STUDENTS, DELETE_STUDENT} from '../../queries/StudentQuery';

/* STYLES */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

/* STUDENTS COMPONENT */
const Students : FunctionComponent = () => {
  const classes = useStyles();
  const { loading : queryLoading, error: queryError, data } = useQuery<StudentData>(GET_STUDENTS);
  const [deleteStudent, { loading: mutationLoading, error: mutationError}] = 
    useMutation(DELETE_STUDENT);

  // Change title
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Students`;
  }); 
  /* LOADING */
  if(queryLoading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(queryError) return  <ServerError/>
  
  /* MODIFIED DATA */
  const students = data ? data.students: [];

  /* FUNCTIONS */
  const handleDeleteStudent = (id: string) => {
    deleteStudent({
      variables: {where: {id: id}},
      update(cache, { data: { deleteStudent } }) {
        const existingStudents = cache.readQuery<StudentData>({ query: GET_STUDENTS });
        if(existingStudents){
        const newStudents = existingStudents.students.filter(existingStudent => (existingStudent.id !== deleteStudent.id))
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { students:  newStudents},
          });
        }
      } 
    });
  }
  
  /* SHOW COMPONENT */
  return (
    <>
      <StudentsTable students={students} handleDeleteStudent={handleDeleteStudent}/>
    </>
  );
}

export default Students;