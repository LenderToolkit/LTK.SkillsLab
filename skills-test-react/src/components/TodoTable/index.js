import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Actions } from "../../store";

import { CONSTANTS } from "../../constants";
import { Delete as DeleteIcon } from "@mui/icons-material";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

const TodoTableComponent = ({ todos }) => {
  const dispatch = useDispatch();

  const onDeleteTodo = useCallback((index) => {
    dispatch(Actions.todo.removeTodo({ index }));
  });

  return (
    <Paper sx={{ my: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{CONSTANTS.tableHeader.number}</TableCell>
            <TableCell align="center">{CONSTANTS.tableHeader.name}</TableCell>
            <TableCell align="center">{CONSTANTS.tableHeader.action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo, index) => (
            <TableRow key={index}>
              <TableCell sx={{width: "15%"}}>{index + 1}</TableCell>
              <TableCell align="center">
                <div style={{width: "300px", overflow: "hidden", textOverflow: "ellipsis"}}>{todo}</div>
              </TableCell>
              <TableCell align="center"  sx={{width: "25%"}}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteTodo(index)}
                  size="small"
                  color="error"
                >
                  {CONSTANTS.general.delete}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TodoTableComponent;
