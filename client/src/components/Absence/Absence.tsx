import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface studentAbsences {
  name: string,
  absences: [{
    day: number,
    presence: number
  }]
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

function Absence() {
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Absence`;
  }); 
  const classes = useStyles();

  const [datas, setDatas] = useState<Array<studentAbsences>>(
    [
      {
        name: "John",
        absences: [{
          day: 1,
          presence: 1
        }]
      },
      {
        name: "Bob",
        absences: [{
          day: 1,
          presence: 0.5
        }]
      }
    ]
  );

  const handleChange = (name: string, day: number, presence: number ) => {
    for(let data of datas) {
      if(data.name === name) {
         for(let absence of data.absences){
           if(absence.day === day){
             absence.presence = presence;
           }
         }
      }
    }
    setDatas(datas);
  }

  return (
    <>
      <h1>Absence</h1>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell align="right">Day 1</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map(data => (
              <TableRow key={data.name}>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                {data.absences.map(absence => (
                  <TableCell align="center">
                    <Select
                      value={absence.presence}
                      onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                        let presence: number = (event.target.value as number); 
                        handleChange(data.name, absence.day, presence)}
                      }
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