import * as React from 'react';
import { TodoContextType, ITodo } from '../../@types/@types.todo';
import { TodoContext } from '../../contexts/todoContext';
import Todo from '../../components/todo/Todo';

const Todos = () => {
  const { todos, updateTodo } = React.useContext(TodoContext) as TodoContextType;
  return (
    <>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} updateTodo={updateTodo} todo={todo} />
      ))}
    </>
  );
};

export default Todos;