import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BasicForm = () => {
  const [dataRows, setDataRows] = useState([]);

  const deleteRow = (index) => {
    const newDataRows = [...dataRows];
    newDataRows.splice(index, 1);
    setDataRows(newDataRows);
  };

  return (
    <div>
      <h1>TODO LIST</h1>

      <Formik
        initialValues={{
          todo: '',
        }}
        onSubmit={(values) => {
          const { todo } = values;
          todo && setDataRows([...dataRows, todo]);
        }}
      >
        <Form>
          <label htmlFor='todo'>Add ToDo Items</label>
          <Field
            id='todo'
            name='todo'
            placeholder='Take out the trash'
            type='text'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>

      {dataRows.length > 0 && (
        <TableContainer sx={{ m: 2, maxWidth: 650 }} component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ToDo Items</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component='th' scope='row'>
                    <Checkbox />
                    {row}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Button
                      startIcon={<DeleteIcon />}
                      variant='outlined'
                      size='small'
                      color='error'
                      onClick={() => {
                        deleteRow(idx);
                      }}
                    >
                      Delete Row
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default BasicForm;
