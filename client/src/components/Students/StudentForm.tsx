import React, { useEffect, useState, FunctionComponent } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
import StudentFromBatch from './StudentFormBatch'; 
import {Link} from 'react-router-dom';
import classNames from 'classnames';

interface StudentFormProps {
  action: () => void,
  values: StudentInterface,
  setValues: any,
  newSocialAssistant: boolean, 
  setNewSocialAssistant: (newSocialAssistant: boolean) => void,
  newBatch: boolean,
  setNewBatch: (newBatch: boolean) => void
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
  }),
);

const StudentForm : FunctionComponent<StudentFormProps> = ({action,values,setValues,newSocialAssistant, setNewSocialAssistant, newBatch, setNewBatch}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

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
        ["birthday"]: moment(date),
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
      <Grid container justify="space-around">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        </MuiPickersUtilsProvider>
      </Grid>
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
                            {isLastStep() ?
                            <Button variant="contained" color="primary" onClick={action}>
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
    </>
  );
}

export default StudentForm;