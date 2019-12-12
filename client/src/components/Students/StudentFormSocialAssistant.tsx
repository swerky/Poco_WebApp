import React, { FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StudentFormSocialAssistantFormProps from '../../interfaces/StudentFormSocialAssistantFormProps.interface';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import SelectField from '../../utils/components/SelectField';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerError from '../../utils/Errors/ServerError';
import {OptionType} from '../../utils/components/SelectField.interface';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {SocialAssistantInterface} from '../../interfaces/Student.interface';

const GET_SOCIAL_ASSISTANTS = gql`
  {
  	socialAssistants{
      id
      firstName
      lastName
      phone
      email
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    selectRow: {
      marginTop: '24px'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    titleNewSocialAssistant: {
      paddingBottom: '10px',
      paddingTop: '10px',
      paddingLeft: '5px',
      marginTop: '0px',
      marginBottom: '0px'
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const SocialFormSocialAssistant : FunctionComponent<StudentFormSocialAssistantFormProps> = ({handleTextSocialAssistantChange, socialAssistant, newSocialAssistant, setNewSocialAssistant, handleIdSocialAssistantChange}: StudentFormSocialAssistantFormProps) => {
  const classes = useStyles();

  /* GETTING EXISTING SOCIAL ASSISTANT */
  const {loading, error, data} = useQuery(GET_SOCIAL_ASSISTANTS);

  /* LOADING */
  if(loading) return <CircularProgress className={classes.progress} />

  /* ERROR */
  if(error) return  <ServerError/>

  console.log(data.socialAssistants);

  const suggestions = data.socialAssistants.map((socialAssistant : SocialAssistantInterface) => ({
    value: socialAssistant.id,
    label: socialAssistant.firstName + " " + socialAssistant.lastName
  }));

  /* SHOW COMPONENT */
  return (
    <>
      {!newSocialAssistant ?
        <Grid container className={classes.selectRow}>
          <Grid item xs={11}>
            <SelectField 
              suggestions={suggestions} 
              label="Search Social Assistant" 
              placeholder="Search a social Assistant name" 
              value={socialAssistant.id}
              handleChangeValue={handleIdSocialAssistantChange}
              />
          </Grid>
          <Grid item xs={1}>
            <Grid 
              container 
              alignItems="center"
              justify="center"
              direction="column"
            >
              <IconButton aria-label="add" onClick={() => setNewSocialAssistant(!newSocialAssistant)}>
                <Tooltip title="Add new social assistant">
                    <AddIcon />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      :
      <>
        <Grid container className={classes.selectRow}>
          <Grid item xs={11}>
            <h2 className={classes.titleNewSocialAssistant}>New Social Assistant</h2>
          </Grid>
          <Grid item xs={1}>
            <Grid 
              container 
              alignItems="center"
              justify="center"
              direction="column"
            >
              <IconButton aria-label="search" onClick={() => setNewSocialAssistant(!newSocialAssistant)}>
                <Tooltip title="Search an existing social assistant">
                    <SearchIcon />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </ Grid>
        <TextField
          id="socialAssistant.lastName"
          label="Name"
          onChange={handleTextSocialAssistantChange('lastName')}
          className={classes.input}
          value={socialAssistant.lastName}
          margin="normal" 
        />
        <TextField
          id="firstName"
          label="First Name"
          onChange={handleTextSocialAssistantChange('firstName')}
          className={classes.input}
          value={socialAssistant.firstName}
          margin="normal" 
        />
        <TextField
          id="email"
          label="Email"
          onChange={handleTextSocialAssistantChange('email')}
          type="email"
          className={classes.input}
          value={socialAssistant.email}
          margin="normal"
        />
        <TextField
          id="phone"
          label="Phone"
          onChange={handleTextSocialAssistantChange('phone')}
          className={classes.input}
          value={socialAssistant.phone}
          margin="normal"
        />
      </>
      }
    </>
  );
}

export default SocialFormSocialAssistant;