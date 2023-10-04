import React from 'react';
import {Field, Form, Formik} from 'formik';
import {Button, Card} from '@mui/material';


/*
  aTodoObject
 { index: 1, text: 'Learn JavaScript', isCompleted: false },
 */
const TodoList = () => {
    const [todos, setTodos] = React.useState([])
    const addTodo = (todo) => {
        console.log({todo})
        const newTodo = {
            text: todo.text,
            isCompleted: false
        }
        setTodos([...todos, newTodo])
    }
    const deleteTodo = (index) => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    return (

        <div>
            <h1>TODO</h1>
            <Card>
                <ul>
                    {todos.map((todo) => (
                        <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                            <li key={todo.id}>{todo.text}</li>
                            <Button onClick={() => deleteTodo()}>Delete todo</Button>
                        </div>
                    ))}

                </ul>

            </Card>
                <Formik
                    initialValues={{
                        text: '',
                    }}
                    onSubmit={(values) => {
                        addTodo({
                            index: todos.length,
                            text: values.text,
                        })
                    }}
                >
                    <Form>
                        <label htmlFor="todo">Add ToDo </label>
                        <Field id="todo" name="text" placeholder="input the text for your todo here"/>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
        </div>
)
}




export default TodoList
