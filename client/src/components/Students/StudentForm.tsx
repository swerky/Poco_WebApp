import React, { useEffect, useState, FunctionComponent } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Select, Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  KeyboardDatePicker
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/moment';
import StudentFormSocialAssistant from './StudentFormSocialAssistant';
import moment, {Moment} from 'moment';
import StudentInterface, { SocialAssistantInterface, BatchClass } from '../../interfaces/Student.interface';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import StudentFromBatch from './StudentFormBatch'; 
import {ADD_STUDENT, GET_STUDENTS} from '../../queries/StudentQuery';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import {Link} from 'react-router-dom';

interface StudentData {
  students: StudentInterface[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3, 2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    selectInput: {
      marginTop: theme.spacing(3),
      fontSize: '1rem',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: 'inline-block',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    checkbox: {
      marginTop: theme.spacing(3),
    },
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
  }),
);

const StudentForm : FunctionComponent = () => {
  const classes = useStyles();

  /* Hooks */
  const [values, setValues] = useState<StudentInterface>(
    {
      firstName: "",
      lastName: "",
      sexe: "MALE",
      privateEmail: "",
      pocoEmail: "",
      residencePermit: "",
      birthday: moment(),
      nationality: "",
      addressStreet: "",
      addressCity: "",
      addressNPA: null,
      addressCanton: "",
      organisation: "",
      socialAssistant: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      financialParticipation: "YES",
      financialParticipationComment: "",
      borrowLaptops: false,
      foodCost: "",
      batch: {
        id: null,
        name: "",
        startingTime: moment(),
        endTime: moment()
      }
    }
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const [newSocialAssistant, setNewSocialAssistant] = useState(false)
  const [newBatch, setNewBatch] = useState(false);
  const [open, setOpen] = React.useState(false);

  /* Mutation */
  const [addStudent, { loading: mutationLoading, error: mutationError}] = 
    useMutation(
      ADD_STUDENT
    );

  /* STEPPER MANAGER */ 
  const getSteps = () => {
    return ['Personnal info', 'Address info', 'Social info','Powercoders info'];
  }
  
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        // PERSONNAL INFO
        return PersonalInfoForm;
      case 1:
        // ADDRESS
        return AddressForm;
      case 2:
        // SOCIAL INFORMATIONS
        return SocialInfoForm;
      default:
        // POWERCODER INFORMATIONS
        return PowercodersForm;
    }
  }

  /* VARIABLES */
  const steps = getSteps();

  /* SEND FORM */
  const handleSubmit = () => {
    handleComplete();
    const query = makeDataQuery();
    addStudent({
      variables: {data: query},
      update(cache, { data: { addedStudent } }) {
        console.log(addedStudent);
        const existingStudents = cache.readQuery<StudentData>({
          query: GET_STUDENTS 
        });

        console.log(addedStudent)
        
        if(existingStudents){
          cache.writeQuery<StudentData>({
            query: GET_STUDENTS,
            data: { 
              students: [...existingStudents.students, addedStudent.createStudent]
            },
          });
        }
      }
    })
    .then(() => setOpen(true))
    .catch(() => setOpen(false))
  }

  // TODO a enlever après test
  const setDataTest = () => {
    setValues({
      firstName: "Jo",
      lastName: "Smith",
      sexe: "FEMALE",
      privateEmail: "james.smith@heig.ch",
      pocoEmail: "james.smith@powercoders.ch",
      residencePermit: "F",
      birthday: moment(),
      nationality: "Swiss",
      addressStreet: "Ch. de la Motte 4",
      addressCity: "Lully VD",
      addressNPA: 1132,
      addressCanton: "VAUD",
      organisation: "HEIG",
      socialAssistant: {
        id: "ck1at4dlm002a0821gs13n77g",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      financialParticipation: "YES",
      financialParticipationComment: "200CHF per month. Looking for participation from social",
      borrowLaptops: false,
      foodCost: "10CHF days",
      batch: {
        id: "ck1at4dn6002b08217teos4yt",
        name: "",
        startingTime: moment(),
        endTime: moment()
      }
    });

    setActiveStep(3);
    let newCompleted = completed;
    for(let i = 0; i < steps.length -1; i++){
      newCompleted[i] = true;
    }
    
    setCompleted(newCompleted);
  }

  const makeDataQuery = () => {
    return {
      firstName: values.firstName,
      lastName: values.lastName,
      sexe: values.sexe,
      privateEmail: values.privateEmail,
      pocoEmail: values.pocoEmail,
      residencePermit: values.residencePermit,
      birthday: values.birthday,
      nationality: values.nationality,
      addressStreet: values.addressStreet,
      addressCity: values.addressCity,
      addressNPA: values.addressNPA,
      addressCanton: values.addressCanton,
      organisation: values.organisation === "" ? null : values.organisation,
      financialParticipation: values.financialParticipation,
      financialParticipationComment: values.financialParticipation === "" ? null : values.financialParticipation,
      socialAssistant: makeDataQuerySocialAssistant(),
      borrowLaptops: values.borrowLaptops,
      foodCost: values.foodCost === "" ? null: values.foodCost,
      batch: makeDataQueryBatch()
    }
  }

  const makeDataQuerySocialAssistant = () => {
    return values.socialAssistant ? (values.socialAssistant.id !== null ? 
      // Have a social assistant
      (newSocialAssistant ? 
        // Add new social assistant
        {
          create:{ 
            firstName: values.socialAssistant.firstName,
            lastName: values.socialAssistant.lastName,
            phone: values.socialAssistant.phone,
            email: values.socialAssistant.email
          }
        }
      :
        {
          connect:{ 
            id: values.socialAssistant.id,
          }
        }) : null) : null;
  }

  const makeDataQueryBatch = () => {
    return values.batch ? (values.batch.id !== null ?
        (newBatch ? 
          {
            create:{ 
              name: values.batch.name,
              startingTime: values.batch.startingTime,
              endTime: values.batch.endTime,
            }
          }
        :
          {
            connect:{ 
              id: values.batch.id,
            }
          }
        ) : null
      ) : null;
  }

  /* HandleChange */
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues((oldValues : StudentInterface) => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  };

  const handleDateChange = (date: MaterialUiPickersDate | null) => {
    if(date !== null){
      setValues((oldValues : StudentInterface) => ({
        ...oldValues,
        ["birthday"]: date,
      }));
    }
  };

  const handleBooleanChange = (event: React.ChangeEvent<{ name?: string; checked: boolean }>) => {
    setValues((oldValues : StudentInterface) => ({
      ...oldValues,
      [event.target.name as string]: event.target.checked,
    }));
  };

  const handleTextChange = (name: keyof StudentInterface) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleTextSocialAssistantChange = (name: keyof SocialAssistantInterface) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let socialAss = values.socialAssistant;
    if(socialAss){
      socialAss[name] = (event.target.value as never);
      setValues({ ...values, ['socialAssistant']: socialAss });
    }
  }

  const handleTextBatchChange = (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let batch = values.batch;
    if(batch){
      batch[name] = (event.target.value as never);
      setValues({ ...values, ['batch']: batch });
    }
  }

  const handleDateBatchChange = (date: MaterialUiPickersDate | null, value: unknown) => {
    if(date !== null){
      let batch : BatchClass = (values.batch as BatchClass);
      if(batch) {
        batch[(value as keyof BatchClass)] = (date as never);
        setValues((oldValues : StudentInterface) => ({
          ...oldValues,
          ["batch"]: batch,
        }));
      }
      
    }
  }

  /* SNACKBAR HANDLER */
  const handleClose = () => {
    setOpen(false);
  }

  /* STEPPER */
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted =   () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  /* PERSONNAL INFO */
  const PersonalInfoForm = (
    <FormGroup>
      <TextField
        required
        id="lastName"
        label="Name"
        onChange={handleTextChange('lastName')}
        className={classes.input}
        value={values.lastName}
        margin="normal" 
      />
      <TextField
        required
        id="firstName"
        label="First Name"
        onChange={handleTextChange('firstName')}
        className={classes.input}
        value={values.firstName}
        margin="normal" 
      />
      <Select
        required
        value={values.sexe}
        className={classNames(classes.input,classes.selectInput)}
        onChange={handleChange}
        inputProps={{
          name: 'sexe',
          id: 'sexe',
        }}
      >
        <MenuItem value={"MALE"}>Male</MenuItem>
        <MenuItem value={"FEMALE"}>Female</MenuItem>
        <MenuItem value={"OTHER"}>Other</MenuItem>
      </Select>
      <TextField
        required
        id="privateEmail"
        label="Private Email"
        onChange={handleTextChange('privateEmail')}
        type="email"
        className={classes.input}
        value={values.privateEmail}
        margin="normal" 
      />
      <TextField
        required
        id="pocoEmail"
        label="Powercoders Email"
        onChange={handleTextChange('pocoEmail')}
        type="email"
        className={classes.input}
        value={values.pocoEmail}
        margin="normal" 
      />
      <TextField
        required
        id="residencePermit"
        label="Residence Permit"
        onChange={handleTextChange('residencePermit')}
        className={classes.input}
        value={values.residencePermit}
        margin="normal" 
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
            margin="normal"
            id="birthday"
            label="Birthday"
            value={values.birthday}
            onChange={handleDateChange}
            className={classes.input}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <TextField
        required
        id="nationality"
        label="Nationality"
        onChange={handleTextChange('nationality')}
        className={classes.input}
        value={values.nationality}
        margin="normal" 
      />
    </FormGroup>
  );

  /* ADDRESS */
  const AddressForm = (
    <FormGroup>
      <TextField
        required
        id="addressStreet"
        label="Street"
        onChange={handleTextChange('addressStreet')}
        className={classes.input}
        value={values.addressStreet}
        margin="normal" 
      />
      <TextField
        required
        id="addressCity"
        label="City"
        onChange={handleTextChange('addressCity')}
        className={classes.input}
        value={values.addressCity}
        margin="normal" 
      />
      <TextField
        required
        id="addressNPA"
        label="NPA"
        onChange={handleTextChange('addressNPA')}
        className={classes.input}
        value={values.addressNPA}
        margin="normal" 
      />
      <TextField
        required
        id="addressCanton"
        label="Canton"
        onChange={handleTextChange('addressCanton')}
        className={classes.input}
        value={values.addressCanton}
        margin="normal" 
      />
    </FormGroup>
  );

  /* SOCIAL INFO */
  const SocialInfoForm = (
    <FormGroup>
      <TextField
        id="organisation"
        label="Organisation"
        onChange={handleTextChange('organisation')}
        className={classes.input}
        value={values.organisation}
        margin="normal" 
      />
      <StudentFormSocialAssistant newSocialAssistant={newSocialAssistant} setNewSocialAssistant={setNewSocialAssistant} socialAssistant={(values.socialAssistant as SocialAssistantInterface)} handleTextSocialAssistantChange={handleTextSocialAssistantChange}/>
    </FormGroup>
  );

  /* POWERCODERS */
  const PowercodersForm = (
      <FormGroup>
          {/*<TextField
            required
            id="financialParticipation"
            label="Financial Participation"
            onChange={handleTextChange('financialParticipation')}
            className={classes.input}
            value={values.financialParticipation}
            margin="normal" 
          />*/}
          <Select
            required
            value={values.financialParticipation}
            className={classNames(classes.input,classes.selectInput)}
            onChange={handleChange}
            inputProps={{
              name: 'financialParticipation',
              id: 'financialParticipation',
            }}
          >
            <MenuItem value={"YES"}>Yes</MenuItem>
            <MenuItem value={"NO"}>No</MenuItem>
            <MenuItem value={"EXTERN"}>Extern</MenuItem>
            <MenuItem value={"OTHER"}>Other</MenuItem>
          </Select>
          <TextField
            required
            id="financialParticipationComment"
            label="Financial Participation Comment"
            onChange={handleTextChange('financialParticipationComment')}
            className={classes.input}
            value={values.financialParticipationComment}
            margin="normal"
          />
          <FormControl className={classNames(classes.input, classes.checkbox)}>
            <FormLabel component="legend">Borrow Laptop</FormLabel>
            <FormControlLabel
              control={<Switch checked={values.borrowLaptops} name="borrowLaptops" onChange={handleBooleanChange} value={!values.borrowLaptops as boolean} />}
              label={values.borrowLaptops ? "Yes" : "No"}
            />
          </FormControl>
          <TextField
            required
            id="foodCost"
            label="Food Cost"
            onChange={handleTextChange('foodCost')}
            className={classes.input}
            value={values.foodCost}
            margin="normal" 
          />
          <StudentFromBatch newBatch={newBatch} setNewBatch={setNewBatch} batch={(values.batch as BatchClass)} handleTextBatchChange={handleTextBatchChange} handleDateBatchChange={handleDateBatchChange}/>
        </FormGroup>
    );

  /* Return component */
  return (
    <>
      <h1>Student Form</h1>
      <Button onClick={setDataTest}>Set data test</Button>
      <Paper className={classes.paper}>
        <form className={classes.container} noValidate autoComplete="on">
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  {/* STEPPER */}
                  <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12} md={6} lg={4}>
                  <div>
                    {allStepsCompleted() ? (
                      <div>
                        <Typography className={classes.instructions}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Link to='/students'>
                          <Button>Students</Button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <div>
                          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                          </Button>
                          {/*<Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            Next
                          </Button>*/}
                          {/*{activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography variant="caption" className={classes.completed}>
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button variant="contained" color="primary" onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                              </Button>
                            ))}*/}
                            {isLastStep() ?
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                 Finish
                            </Button>
                            : 
                            <Button variant="contained" color="primary" onClick={handleComplete}>
                              Next
                            </Button>}
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* SNACKBAR */}
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
    </>
  );
}

export default StudentForm;