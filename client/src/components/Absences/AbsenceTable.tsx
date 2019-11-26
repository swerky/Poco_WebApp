import React, { FunctionComponent, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
//import Table from '@material-ui/core/Table';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
/*import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';*/
import Grid from '@material-ui/core/Grid';
import { StudentAbsence, PresenceInterface } from '../../interfaces/Student.interface';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment'
import AbsenceDialog from './AbsenceDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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
    titleTable: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: '1.3125rem'
    },
    tableRow: {
      paddingTop: '14px',
      paddingBottom: '14px',
      paddingRight: '24px',
      paddingLeft: '24px',
    },
    expandRow: {
      padding: 0
    }
  }),
);

interface AbscenceTableProps {
  students: StudentAbsence[],
  handleDeleteAbsence: (id: string) => void
}

interface EditButtonProps {
  id: string,
  firstName: string,
  lastName: string
}

const EditButton: FunctionComponent<EditButtonProps> = ({ id, firstName, lastName }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /* FUNCTIONS */
  const handleOpenDialog = () => {
    setOpen(true);
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
      <AbsenceDialog key={"dialog_" + id} open={open} handleClose={handleCloseDialog} id={id} firstName={firstName} lastName={lastName} />
    </>
  );
}

const StudentsTable: FunctionComponent<AbscenceTableProps> = ({students, handleDeleteAbsence}) => {
  const classes = useStyles();

  /* SHOW COMPONENT */
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Students Absence
          </Typography>
        </div>
      </Toolbar>
      <Grid container className={classes.tableRow} alignItems="center">
        <Grid item xs={2}><span className={classes.titleTable}>First name</span></Grid>
        <Grid item xs={2}><span className={classes.titleTable}>Last name</span></Grid>
        <Grid item xs={2}><span className={classes.titleTable}>Nb Absences</span></Grid>
        <Grid item xs={2}><span className={classes.titleTable}>Time missed</span></Grid>
        <Grid item xs={2}><span className={classes.titleTable}>Poucentage presence</span></Grid>
        <Grid item xs={2}><span className={classes.titleTable}>Actions</span></Grid>
      </Grid>
      {students.map((student: StudentAbsence) => (
        <ExpansionPanel square key={"expansion_" + student.id}>
          <ExpansionPanelSummary className={classes.expandRow}>
            <Grid key={"container_"+student.id} container className={classes.tableRow} alignItems="center">
              <Grid item xs={2}>{student.firstName}</Grid>
              <Grid item xs={2}>{student.lastName}</Grid>
              <Grid item xs={2}>{student.nbAbsence}</Grid>
              <Grid item xs={2}>{student.timeMissed}</Grid>
              <Grid item xs={2}>{student.pourcentage}</Grid>
              <Grid item xs={2}><EditButton id={student.id!} firstName={student.firstName!} lastName={student.lastName!} /></Grid>
            </Grid>
          </ExpansionPanelSummary>
          <Divider/>
          <ExpansionPanelDetails className={classes.expandRow}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container alignItems="center" className={classes.tableRow}>
                  <Grid item xs={2}><span className={classes.titleTable}>Date</span></Grid>
                  <Grid item xs={2}><span className={classes.titleTable}>From</span></Grid>
                  <Grid item xs={2}><span className={classes.titleTable}>To</span></Grid>
                  <Grid item xs={2}><span className={classes.titleTable}>Reason</span></Grid>
                  <Grid item xs={2}><span className={classes.titleTable}>Good Excuse</span></Grid>
                  <Grid item xs={2}><span className={classes.titleTable}>Actions</span></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {student.presences ? student.presences.map((presence: PresenceInterface) => (
                  <Grid key={"absences_" + presence.id} container className={classes.tableRow} alignItems="center">
                    <Grid item xs={2} key={"absenceFromDate_" + presence.id}>{presence.dateStart.format('DD.MM.YYYY')}</Grid>
                    <Grid item xs={2} key={"absenceFromTime_" + presence.id}>{presence.dateStart.format('hh:mm')}</Grid>
                    <Grid item xs={2} key={"absenceToTime_" + presence.id}>{presence.dateEnd.format('hh:mm')}</Grid>
                    <Grid item xs={2} key={"absenceReason_" + presence.id}>{presence.reason ? presence.reason: "-"}</Grid>
                    <Grid item xs={2} key={"absenceGoodExcuse_" + presence.id}>{presence.goodExcuse ? <ThumbUpIcon/>: <ThumbDownIcon/>}</Grid>
                    <Grid item xs={2} key={"absenceActions_" + presence.id}>
                      <IconButton className={classes.button} aria-label="remove" onClick={() => handleDeleteAbsence(presence.id!)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                )):
                <h2 key={"noAbsence_" + student.id}>No Absence</h2>
                }
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Paper>
  )
}

export default StudentsTable;