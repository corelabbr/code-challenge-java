import React, { useState } from 'react';
import { Todo } from '../types';
import ColorPicker from './ColorPicker';

const colors = [
  '#CDCDCD',
  '#FFA285',
  '#DAFF8B',
  '#ECA1FF',
  '#9DD6FF',
  '#F99494',
  '#FFCAB9',
  '#FFE8AC',
  '#B9FFDD',
  '#BAE2FF',
  '#A99A7C'
];
/**
 * A component to render a single Todo item.
 * @param {{ todo: Todo, onDelete: (id: string) => void, onUpdate: (id: string, currentTodo: Todo, updates: Partial<Todo>) => void }} props
 * @returns {JSX.Element} The rendered Todo item element.
 */
const TodoItem = ({ todo, onDelete, onUpdate }: {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, currentTodo: Todo, updates: Partial<Todo>) => void;
}): JSX.Element => {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [showColors, setShowColors] = useState(false);
  const [editing, setEditing] = useState(false);

  /**
   * Handles the key press event for the title input.
   * If the Enter key is pressed (without the shift key), calls the onUpdate function
   * with the new title and then sets editing to false.
   * @param {React.KeyboardEvent<HTMLInputElement>} event The key press event.
   */
  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {

      onUpdate(todo.id, todo, { title });
      setEditing(false);
    }
  };


  /**
   * Handles the key press event for the content text area.
   * If the Enter key is pressed (without the shift key), calls the onUpdate function
   * with the new content and then sets editing to false.
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} event The key press event.
   */
  const handleContentKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {

      onUpdate(todo.id, todo, { content });
      setEditing(false);
    }
  };

  /**
   * Handles the color change for a todo item.
   * If a color is selected while the color picker is shown, hides the color picker.
   * Calls the onUpdate function with the new color.
   * @param {Todo} todo The todo item whose color is being changed.
   * @param {string} color The new color to assign to the todo item.
   */
  const onColorChange = (todo: Todo, color: string) => {
    showColors && setShowColors(false);
    onUpdate(todo.id, todo, { color });
  };

  return (
    <div className={`todo-item ${todo.favorite ? 'favorite' : ''}`} style={{ backgroundColor: todo.color }}>
      <div className="todo-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleTitleKeyPress}
          className="todo-title"
          disabled={!editing}
          style={{ backgroundColor: todo.color }}
        />
        <button
          className={"favorite-btn" + (todo.favorite ? ' active' : '')}
          onClick={() => onUpdate(todo.id, todo, { favorite: !todo.favorite })}
        >
          {todo.favorite ? '⭐' : '☆'}
        </button>
      </div>
      <div className='separator'></div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyUp={handleContentKeyPress}
        className="todo-content-item"
        disabled={!editing}
        style={{ backgroundColor: todo.color }}
      />
      <div className='footer-todo-item'>{
        showColors && (
          <ColorPicker
            selectedColor={todo.color}
            onColorSelect={(color) => onColorChange(todo, color)}
            colors={colors}
            allowClear={false}
          />
        )
      }
        <div>
          <button
            style={{ backgroundColor: editing ? "rgba(255, 227, 179, 1)" : "transparent" }}
            onClick={() => setEditing(!editing)}
          >
            <img src={'./edit.png'} alt="pen" />
          </button>
          <button
            style={{ backgroundColor: showColors ? "rgba(255, 227, 179, 1)" : "transparent" }}
            onClick={() => setShowColors(!showColors)}
          >
            <img src={'./colors.png'} alt="pen" />
          </button>
        </div>
        <button onClick={() => onDelete(todo.id)}>
          <img src={'./delete.png'} alt="pen" />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;