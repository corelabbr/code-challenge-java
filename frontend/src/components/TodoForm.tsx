import React, { useState } from 'react';
import { Todo } from '../types';

/**
 * A component to render a form to create a new todo.
 * @param {{ onAdd: (todo: Partial<Todo>) => void }} props The component props.
 * @returns {JSX.Element} The rendered component.
 */
const TodoForm = ({ onAdd }: { onAdd: (todo: Partial<Todo>) => void }): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [favorite, setFavorite] = useState<boolean>(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita a cria o de nova linha
            onAdd({ title, content, favorite });
            setTitle('');
            setContent('');
            setFavorite(false);
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-form">
                <div className='todo-form-header'>
                    <input
                        type="text"
                        placeholder="Titulo"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        className="todo-title"
                    />

                    <button
                        className={"favorite-btn " + (favorite ? 'active' : '') }
                        onClick={() => { setFavorite(!favorite); }}
                    >
                        {favorite ? '⭐' : '☆'}
                    </button>
                </div>
                <div className="separator"></div>

                <textarea
                    placeholder="Criar nota..."
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="todo-content"
                    cols={1}
                />
            </div>
        </div>
    );
};


export default TodoForm;
