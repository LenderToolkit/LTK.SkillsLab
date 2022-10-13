import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TodoInputComponent, TodoTableComponent } from '../../components';

const TodoPage = () => {
  const todos = useSelector((state) => state.todo.todos);

  return <>
    <TodoInputComponent />
    {
      todos.length
        ? <TodoTableComponent todos={todos} />
        : null
    }
  </>;
};

export default TodoPage;
