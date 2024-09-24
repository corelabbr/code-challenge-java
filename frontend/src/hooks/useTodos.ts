import { useState, useEffect } from 'react';
import todoService from '../services/todoService';
import { Todo } from '../types';

/**
 * A hook that provides a list of todos, and functions to add, delete, and update them.
 * The list of todos is fetched from the API when the component mounts.
 * When a todo is added, deleted, or updated, the list of todos is updated accordingly.
 * The functions to add, delete, and update todos return a Promise that resolves to the updated
 * todo, or undefined if an error occurs.
 *
 * @returns {Object} An object containing the list of todos, and functions to add, delete, and update them.
 */
export const useTodos = (): {
  todos: Todo[];
  addTodo: (todo: Partial<Todo>) => Promise<Todo | undefined>;
  deleteTodo: (id: string) => Promise<Todo | undefined>;
  updateTodo: (id: string, currentTodo: Todo, updates: Partial<Todo>) => Promise<Todo | undefined>;
} => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {

    /**
     * Fetches the list of todos from the API and updates the state accordingly.
     * If an error occurs, logs the error to the console.
     */
    const fetchTodos = async (): Promise<void> => {
      try {
        const fetchedTodos = await todoService.getTodos();
        setTodos(fetchedTodos || []);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  /**
   * Adds a new todo to the list of todos.
   * The new todo is sent to the API to be created, and if successful, the list of todos is updated
   * to include the new todo.
   * If an error occurs, logs the error to the console and returns undefined.
   *
   * @param {Partial<Todo>} todo The new todo to be added.
   * @returns {Promise<Todo | undefined>} A Promise that resolves to the newly created todo, or undefined if an error occurs.
   */
  const addTodo = async (todo: Partial<Todo>): Promise<Todo | undefined> => {
    try {
      const newTodo = await todoService.createTodo(todo);
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      return undefined;
    }
  };

  /**
   * Deletes a todo from the list of todos.
   * The todo is sent to the API to be deleted, and if successful, the list of todos is updated
   * to exclude the deleted todo.
   * If an error occurs, logs the error to the console and returns undefined.
   *
   * @param {string} id The ID of the todo to be deleted.
   * @returns {Promise<Todo | undefined>} A Promise that resolves to the deleted todo, or undefined if an error occurs.
   */
  const deleteTodo = async (id: string): Promise<Todo | undefined> => {
    try {
      const deletedTodo = await todoService.deleteTodo(id);
      if (deletedTodo) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
      return deletedTodo;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return undefined;
    }
  };

  /**
   * Updates a todo in the list of todos.
   * The todo is sent to the API to be updated, and if successful, the list of todos is updated
   * to include the updated todo.
   * If an error occurs, logs the error to the console and returns undefined.
   *
   * @param {string} id The ID of the todo to be updated.
   * @param {Todo} currentTodo The current todo to be updated.
   * @param {Partial<Todo>} updates The updates to be applied to the current todo.
   * @returns {Promise<Todo | undefined>} A Promise that resolves to the updated todo, or undefined if an error occurs.
   */
  const updateTodo = async (id: string, currentTodo: Todo, updates: Partial<Todo>): Promise<Todo | undefined> => {
    if (!id || !currentTodo || !updates) {
      throw new Error('Cannot update a null or undefined todo');
    }

    const updatedData = { ...currentTodo, ...updates };

    try {
      const updatedTodo = await todoService.updateTodo(id, updatedData);
      if (updatedTodo) {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        return updatedTodo;
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }

    return undefined;
  };

  return { todos, addTodo, deleteTodo, updateTodo };
};
