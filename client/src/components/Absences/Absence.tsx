import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

interface absence {
  day: number,
  presence: number
}

interface studentAbsences {
  name: string,
  absences: absence[]
}

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
  }),
);

const Absence : FunctionComponent = () => {
  const classes = useStyles();
  
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Absence`;
  }); 

  const [datas, setDatas] = useState<Array<studentAbsences>>(
    [
      {
        name: "John",
        absences: [{
            day: 1,
            presence: 1
          },
          {
            day: 2,
            presence: 1
          },
        ]
      },
      {
        name: "Bob",
        absences: [{
            day: 1,
            presence: 0.5
          },
          {
            day: 2,
            presence: 1
          }
        ]
      }
    ]
  );

  function handleChange(name: string, day: number, event: React.ChangeEvent<{value: unknown}>) {
    let presence: number = event.target.value as number
    let values : Array<studentAbsences> = datas;
    for(let value of values) {
      if(value.name === name) {
         for(let absence of value.absences){
           if(absence.day === day){
             absence.presence = presence;
           }
         }
      }
    }
    setDatas(() => [...values]);
  }

  return (
    <>
      <h1>Absence</h1>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow key="metadata">
              <TableCell key="studentTitle">Student</TableCell>
              <TableCell align="center" key="day1">Day 1</TableCell>
              <TableCell align="center" key="day2">Day 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map(data => (
              <TableRow key={data.name}>
                <TableCell component="th" scope="row" key={data.name + "_name"}>
                  {data.name}
                </TableCell>
                {data.absences.map(absence => (
                  <TableCell align="center" key={data.name + "_abscence_" + absence.day}>
                  <FormControl>
                    <Select
                      value={absence.presence}
                      onChange={(event: React.ChangeEvent<{value: unknown}>) => handleChange(data.name, absence.day, event)}
                      inputProps={{
                        name: 'age',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value={1.0}>1</MenuItem>
                      <MenuItem value={0.8}>0.8</MenuItem>
                      <MenuItem value={0.5}>0.5</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
                    </Select>
                    </FormControl>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Absence;