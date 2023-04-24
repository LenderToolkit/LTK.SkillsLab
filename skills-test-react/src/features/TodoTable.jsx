import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo } from './todoSlice'
import { Button } from '@mui/material';


function TodoTable() {
    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    
    const onDeleteTodo = id => dispatch(deleteTodo(id)); 

  return (
    <table>
        <thead>
            <tr>
                <th>Todos</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {todos.map((todo) => (
                <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>
                        <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={()=> onDeleteTodo(todo.id)}>Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TodoTable