import React from "react";
// import ReactDOM from 'react-dom';
import { Formik, Field, Form } from "formik";
import { Button } from "@mui/material";

import TodoTable from "../features/TodoTable";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'

function BasicForm() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>TODO</h1>
      <Link to='/'>
        <Logout /> Return to Home
      </Link>
      <Divider />
      <Formik
        initialValues={{
          id: "",
          title: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const todo = { ...values, id: nanoid() };
          dispatch(addTodo(todo));
          resetForm();
        }}
      >
        <Form>
          <div>
            <label htmlFor="title">Enter Task</label>
            <Field name="title" placeholder="TextHere" />
            <Button style={{ backgroundColor: 'blue', color: 'white' }} type="submit">Add Task</Button>
          </div>
        </Form>
      </Formik>
      <TodoTable />
    </div>
  );
}

export default BasicForm;
