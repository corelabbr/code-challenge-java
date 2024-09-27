import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

import NoteInput from './components/NoteInput/NoteInput';
import Header from './components/Header/Header';
import CardSection from './components/CardSection/CardSection';
import Card from './components/Card/Card';
import { SwitchTheme } from './components/SwitchTheme/SwitchTheme';

import * as api from './services/api';

jest.mock('./services/api');

/* HEADER SECTION TESTS */
test('renders Header and handles search input', () => {
  const onSearchMock = jest.fn();

  render(<Header onSearch={onSearchMock} />);

  const logo = screen.getByAltText(/corenotes/i);
  expect(logo).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText(/pesquisar notas/i);
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'Test Note' } });
  expect(onSearchMock).toHaveBeenCalledWith('Test Note');
});

/*=========================================================*/

/* NoteInput SECTION TESTS */
test('renders save button when title and content are filled', () => {
  render(<NoteInput updateNotes={jest.fn()} />);

  const titleInput = screen.getByPlaceholderText('Título');
  const contentInput = screen.getByPlaceholderText('Criar nota...');

  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(contentInput, { target: { value: 'Test Content' } });

  const saveButton = screen.getByRole('button', { name: /salvar/i });
  expect(saveButton).toBeInTheDocument();
});

/*=========================================================*/

/* CardSection SECTION TESTS */
describe('CardSection', () => {
  const updateNotesMock = jest.fn();

  const notes = [
    { id: 1, title: 'Nota 1', description: 'Descrição 1', color: 'red', favorite: true },
    { id: 2, title: 'Nota 2', description: 'Descrição 2', color: 'blue', favorite: false },
    { id: 3, title: 'Nota 3', description: 'Descrição 3', color: 'green', favorite: true },
  ];

  test('renders favorite notes section when there are favorite notes', () => {
    render(<CardSection notes={notes} updateNotes={updateNotesMock} />);

    expect(screen.getByText('Favoritas')).toBeInTheDocument();
    expect(screen.getByText('Nota 1')).toBeInTheDocument();
    expect(screen.getByText('Nota 3')).toBeInTheDocument();
  });

  test('renders other notes section when there are non-favorite notes', () => {
    render(<CardSection notes={notes} updateNotes={updateNotesMock} />);

    expect(screen.getByText('Outras')).toBeInTheDocument();
    expect(screen.getByText('Nota 2')).toBeInTheDocument();
  });

  test('does not render favorite notes section when there are no favorite notes', () => {
    const emptyNotes = [
      { id: 2, title: 'Nota 2', description: 'Descrição 2', color: 'blue', favorite: false },
    ];

    render(<CardSection notes={emptyNotes} updateNotes={updateNotesMock} />);

    expect(screen.queryByText('Favoritas')).not.toBeInTheDocument();
  });

  test('does not render other notes section when there are no non-favorite notes', () => {
    const favoriteOnlyNotes = [
      { id: 1, title: 'Nota 1', description: 'Descrição 1', color: 'red', favorite: true },
    ];

    render(<CardSection notes={favoriteOnlyNotes} updateNotes={updateNotesMock} />);

    expect(screen.queryByText('Outras')).not.toBeInTheDocument();
  });
});

/*=========================================================*/

/* CardSection SECTION TESTS */
describe('Card', () => {
  const updateNotesMock = jest.fn();
  const props = {
    id: 1,
    title: 'Test Title',
    description: 'Test Description',
    color: 'red',
    isFavorite: false,
    updateNotes: updateNotesMock,
  };

  test('renders the card with initial props', () => {
    render(<Card {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  test('toggles editing mode', async () => {
    render(<Card {...props} />);
    const editButton = screen.getByTestId('edit-button');

    await act(async () => {
      fireEvent.click(editButton);
    });

    expect(await screen.findByDisplayValue('Test Title')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Test Description')).toBeInTheDocument();
  });

  test('handles save action', async () => {
    api.updateNote.mockResolvedValueOnce({ success: true });
    render(<Card {...props} />);
    const editButton = screen.getByTestId('edit-button');
    
    await act(async () => {
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByDisplayValue('Test Title'), { target: { value: 'Updated Title' } });
      fireEvent.change(screen.getByDisplayValue('Test Description'), { target: { value: 'Updated Description' } });
    });

    const saveButton = screen.getByTestId('save-button');
    
    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(api.updateNote).toHaveBeenCalledWith(props.id, {
      title: 'Updated Title',
      description: 'Updated Description',
      color: props.color,
      favorite: props.isFavorite,
    });
    expect(updateNotesMock).toHaveBeenCalled();
  });

  test('handles delete action', async () => {
    api.deleteNote.mockResolvedValueOnce({ success: true });
    render(<Card {...props} />);
    const deleteButton = screen.getByTestId('delete-button');
    
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(api.deleteNote).toHaveBeenCalledWith(props.id);
    expect(updateNotesMock).toHaveBeenCalled();
  });

  test('toggles favorite status', async () => {
    render(<Card {...props} />);
    const favoriteButton = screen.getByTestId('favorite-button');
    
    await act(async () => {
      fireEvent.click(favoriteButton);
    });
    
    expect(favoriteButton).toHaveClass('favorite');
  });

  test('color picker displays and changes color', async () => {
    render(<Card {...props} />);
    const colorPickerButton = screen.getByTestId('color-picker-button');
    
    await act(async () => {
      fireEvent.click(colorPickerButton);
    });
  
    const colorButtons = screen.getAllByRole('button', { class: /color/ });
    
    const colorButton = colorButtons.find(button => button.className.includes('light-blue'));
    
    await act(async () => {
      fireEvent.click(colorButton);
    });
  
    expect(updateNotesMock).toHaveBeenCalled();
  });
});

/*=========================================================*/

/* SwitchTheme SECTION TESTS */
test('toggles theme when clicked', () => {
  const handleClick = jest.fn();
  render(<SwitchTheme onClick={handleClick} />);

  const switchInput = screen.getByRole('switch');
  fireEvent.click(switchInput);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

/*=========================================================*/