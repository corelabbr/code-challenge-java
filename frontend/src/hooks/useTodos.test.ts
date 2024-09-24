import { renderHook, act } from '@testing-library/react-hooks';
import { useTodos } from './useTodos'; // Update this path as necessary
import todoService from '../services/todoService';
import { Todo } from '../types';

jest.mock('../services/todoService');

/**
 * @module useTodos
 * @description A hook that provides a list of todos, and functions to add, delete, and update them.
 * The list of todos is fetched from the API when the component mounts.
 * When a todo is added, deleted, or updated, the list of todos is updated accordingly.
 * The functions to add, delete, and update todos return a Promise that resolves to the updated
 * todo, or undefined if an error occurs.
 *
 * @returns {Object} An object containing the list of todos, and functions to add, delete, and update them.
 * @property {Todo[]} todos The list of todos.
 * @property {(todo: Partial<Todo>) => Promise<Todo | undefined>} addTodo Adds a new todo to the list of todos.
 * @property {(id: string) => Promise<Todo | undefined>} deleteTodo Deletes a todo from the list of todos.
 * @property {(id: string, currentTodo: Todo, updates: Partial<Todo>) => Promise<Todo | undefined>} updateTodo Updates a todo in the list of todos.
 */
describe('useTodos', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Test Todo 1', content: 'Content 1', favorite: false, color: 'red' },
    { id: '2', title: 'Test Todo 2', content: 'Content 2', favorite: true, color: 'blue' },
  ];

  /**
   * Clears all mocks before each test.
   */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests if the `useTodos` hook fetches all todos on mount.
   * Verifies that the list of todos in the state is equal to `mockTodos`.
   */
  it('fetches todos on mount', async () => {
    (todoService.getTodos as jest.Mock).mockResolvedValue(mockTodos);

    const { result, waitForNextUpdate } = renderHook(() => useTodos());

    await waitForNextUpdate();

    expect(result.current.todos).toEqual(mockTodos);
  });


  /**
   * Tests if the `addTodo` function adds a new todo.
   * Verifies that the created todo matches the expected todo and that the state of todos contains the new todo.
   */
  it('adds a new todo', async () => {
    const newTodo = { title: 'New Todo', content: 'New Content', favorite: false, color: 'green' };
    const createdTodo = { id: '3', ...newTodo };

    (todoService.createTodo as jest.Mock).mockResolvedValue(createdTodo);

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      const addedTodo = await result.current.addTodo(newTodo);
      expect(addedTodo).toEqual(createdTodo);
    });

    expect(result.current.todos).toContainEqual(createdTodo);
  });

  /**
   * Tests if the `deleteTodo` function removes an existing todo.
   * Verifies that the state of todos has a reduced length and no longer contains the deleted todo.
   */
  it('deletes a todo', async () => {
    (todoService.getTodos as jest.Mock).mockResolvedValue(mockTodos);
    (todoService.deleteTodo as jest.Mock).mockResolvedValue(mockTodos[0]);

    const { result, waitForNextUpdate } = renderHook(() => useTodos());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.deleteTodo(mockTodos[0].id);
    });

    expect(result.current.todos).toHaveLength(mockTodos.length - 1);
    expect(result.current.todos).not.toContainEqual(mockTodos[0]);
  });

  /**
   * Tests if the `updateTodo` function updates an existing todo.
   * Verifies that the updated todo result matches the expected value and that the state of todos contains the updated todo.
   */
  it('updates a todo', async () => {
    const updatedTodo = { title: 'Updated Todo', content: 'Updated Content' };
    const todoToUpdate = mockTodos[0];
    const updatedTodoResponse = { ...todoToUpdate, ...updatedTodo };

    (todoService.getTodos as jest.Mock).mockResolvedValue(mockTodos);
    (todoService.updateTodo as jest.Mock).mockResolvedValue(updatedTodoResponse);

    const { result, waitForNextUpdate } = renderHook(() => useTodos());
    await waitForNextUpdate();

    await act(async () => {
      const resultTodo = await result.current.updateTodo(todoToUpdate.id, todoToUpdate, updatedTodo);
      expect(resultTodo).toEqual(updatedTodoResponse);
    });

    expect(result.current.todos).toContainEqual(updatedTodoResponse);
  });
});
