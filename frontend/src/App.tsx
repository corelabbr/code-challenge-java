import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';
import Header from './components/Header';
import './styles/main.scss';
import { Todo } from './types';

/**
 * The main App component.
 * @returns {JSX.Element} The rendered component.
 */
const App = (): JSX.Element => {
    const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className="app-container">
            <Header
                searchValue={searchValue}
                onSearch={(newSearchValue: string) => setSearchValue(newSearchValue)}
            />
            <TodoForm
                onAdd={(todo: Partial<Todo>) => addTodo(todo)}
            />
            <TodoList
                todos={todos}
                onDelete={(id: string) => deleteTodo(id)}
                onUpdate={(id: string, currentTodo: Todo, updates: Partial<Todo>) => updateTodo(id, currentTodo, updates)}
                searchValue={searchValue}
            />
        </div>
    );
};

export default App;
