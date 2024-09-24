import React, { useState, useMemo } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';
import ColorPicker from './ColorPicker';


/**
 * A component to render a list of todos.
 * @param {{ todos: Todo[], onDelete: (id: string) => void, onUpdate: (id: string, currentTodo: Todo, updates: Partial<Todo>) => void, searchValue: string }} props
 * @returns {JSX.Element} The rendered component.
 */
const TodoList = ({
  todos,
  onDelete,
  onUpdate,
  searchValue,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, currentTodo: Todo, updates: Partial<Todo>) => void;
  searchValue: string;
}): JSX.Element => {

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [colorsVisible, setColorsVisible] = useState<boolean>(false);

  /**
 * Computes a list of todos that match the search criteria and selected color.
 * The todos are filtered based on the following criteria:
 * - The title of the todo includes the search value (case-insensitive).
 * - The todo's color matches the selected color, if a color is selected.
 * 
 * The result is memoized to optimize performance and avoid unnecessary recalculations.
 */
  const filteredTodos = useMemo(() =>
    todos.filter(
      todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedColor ? todo.color === selectedColor : true)
    ),
    [todos, searchValue, selectedColor]
  );

  /**
   * Computes a list of favorite todos from the filtered todos.
   * This includes only the todos that are marked as favorites.
   * 
   * The result is memoized to enhance performance and reduce re-computation.
   */
  const favoriteTodos = useMemo(() =>
    filteredTodos.filter(todo => todo.favorite),
    [filteredTodos]
  );

  /**
   * Computes a list of non-favorite todos from the filtered todos.
   * This includes only the todos that are not marked as favorites.
   * 
   * The result is memoized to improve efficiency and minimize unnecessary updates.
   */
  const otherTodos = useMemo(() =>
    filteredTodos.filter(todo => !todo.favorite),
    [filteredTodos]
  );

  return (
    <div className="todo-list">
      <div className="filter-section">
        <span>Filtrar por cores</span>
        <button onClick={() => setColorsVisible(!colorsVisible)}>
          <img src="./color-filters.png" alt="Filter" />
        </button>
        {
          colorsVisible && (
            <ColorPicker
              selectedColor={selectedColor}
              onColorSelect={(color) => setSelectedColor(color)}
              allowClear={true} // Allow clearing the filter
            />
          )

        }
      </div>

      {
        favoriteTodos.length === 0 && otherTodos.length === 0 && (
          <div>
            <span>Nenhum item corresponde a busca</span>
          </div>
        )
      }
      {favoriteTodos.length > 0 && (
        <div className="todo-section">
          <span>Favoritos</span>
          <div className="todo-items">
            {favoriteTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
      {otherTodos.length > 0 && (
        <div className="todo-section">
          <span>Outros</span>
          <div className="todo-items">
            {otherTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
