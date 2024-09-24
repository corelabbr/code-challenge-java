import axios from 'axios';
import { Todo, ApiResponse, ApiResponseGet } from '../types';

const API_URL = 'http://localhost:8080/api/todos';

/**
 * Fetches all todos from the API.
 * @returns {Promise<Todo[]>} A promise that resolves to an array of Todo objects.
 * @throws {Error} If there is an error fetching the todos, an error is thrown.
 */
const getTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get<ApiResponseGet>(API_URL);

    return data.data;
  } catch (err) {
    console.error('Error fetching todos:', err);
    return [];
  }
};

/**
 * Creates a new todo item with the given data.
 * @param {Partial<Todo>} todo The data to create the Todo item with.
 * @returns {Promise<Todo>} A promise that resolves to the created Todo item.
 * @throws {Error} If the todo data is null, or if there is an error creating the Todo item.
 */
const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  if (!todo) {
    throw new Error('Cannot create a null todo');
  }

  try {
    const { data } = await axios.post<ApiResponse>(API_URL, todo);
    return data.data;
  } catch (err) {
    console.error('Error creating todo:', err);
    throw err;
  }
};

/**
 * Deletes the Todo item with the given id.
 * @param {string} id The id of the Todo item to delete.
 * @returns {Promise<Todo>} A promise that resolves to the deleted Todo item.
 * @throws {Error} If the id is null, or if there is an error deleting the Todo item.
 */
const deleteTodo = async (id: string): Promise<Todo> => {
  if (!id) {
    throw new Error('Cannot delete a null todo');
  }

  try {
    const { data } = await axios.delete<ApiResponse>(`${API_URL}/${id}`);
    return data.data;
  } catch (err) {
    console.error('Error deleting todo:', err);
    throw err;
  }
};

/**
 * Updates the Todo item with the given id and data.
 * @param {string} id The id of the Todo item to update.
 * @param {Todo} todo The data to update the Todo item with.
 * @returns {Promise<Todo>} A promise that resolves to the updated Todo item.
 * @throws {Error} If the id or todo data is null, or if there is an error updating the Todo item.
 */
const updateTodo = async (id: string, todo: Todo): Promise<Todo> => {
  if (!id) {
    throw new Error('Cannot update a null todo');
  }

  if (!todo) {
    throw new Error('Cannot update a todo with null data');
  }

  try {
    const { data } = await axios.put<ApiResponse>(`${API_URL}/${id}`, todo);
    return data.data;
  } catch (err) {
    console.error('Error updating todo:', err);
    throw err;
  }
};

const todoService = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};

export default todoService;
