import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Actions } from '../../store';

import { CONSTANTS } from '../../constants';
import { Delete as DeleteIcon } from '@mui/icons-material';

import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material';

const TodoTableComponent = ({ todos }) => {
  const dispatch = useDispatch();

  const onDeleteTodo = useCallback((index) => {
    dispatch(Actions.todo.removeTodo({ index }));
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{CONSTANTS.tableHeader.number}</TableCell>
          <TableCell>{CONSTANTS.tableHeader.name}</TableCell>
          <TableCell>{CONSTANTS.tableHeader.action}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          todos.map((todo, index) =>
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{todo}</TableCell>
              <TableCell>
                <Button 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                onClick={() => onDeleteTodo(index)}
                size="small"
                >
                  {CONSTANTS.general.delete}
                </Button>
              </TableCell>            
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
};

export default TodoTableComponent;
