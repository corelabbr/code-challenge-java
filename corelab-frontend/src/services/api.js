const apiURL = "http://localhost:8080/api/ToDos";

export async function fetchNotes() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('Erro ao buscar as notas.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição: ', error);
      return [];
    }
}


export async function searchNotes(query) {
  const response = await fetch(`${apiURL}/search?query=${encodeURIComponent(query)}`);

  console.log(response);
  const data = await response.json();
  return data;
}

export async function createNote(noteData) {
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar a nota: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Nota criada com sucesso:', data);
  
    } catch (error) {
      console.error('Erro ao criar a nota:', error);
    }
}
  
export async function updateNote(id, updatedData) {
    console.log('Atualizando nota com ID:', id, 'Dados:', updatedData);
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log(response);
        if (!response.ok) {
            throw new Error('Erro ao atualizar a nota.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

export async function deleteNote(id) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar a nota.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}