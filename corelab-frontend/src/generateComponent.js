const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const componentName = process.argv[3];

const componentsDirectory = path.join(__dirname, './', 'components');

// Função para criar um novo componente
function createComponent(name) {
  const componentDirectory = path.join(componentsDirectory, name);

  if (fs.existsSync(componentDirectory)) {
    console.error('O componente já existe.');
    process.exit(1);
  }

  fs.mkdirSync(componentDirectory);

  const componentTemplate = 
  `import React from 'react';
import './${name}.scss'

export function ${name}() {
    return (
        <section className="${name.toLowerCase()} section" id="${name}">
          <h1>${name}</h1>
          <div className="container">
            
          </div>
        </section>
    );
}`;

  fs.writeFileSync(path.join(componentDirectory, `${name}.jsx`), componentTemplate);
  fs.writeFileSync(path.join(componentDirectory, `${name}.scss`), '');

  // Guardar o nome do componente criado
  const historyFile = path.join(__dirname, './', 'history.txt');
  fs.appendFileSync(historyFile, `${name}\n`);
  console.log(`Componente ${name} criado com sucesso.`);
}

// Função para deletar um componente
function deleteComponent(name) {
  const componentDirectory = path.join(componentsDirectory, name);

  if (!fs.existsSync(componentDirectory)) {
    console.error('O componente não existe.');
    process.exit(1);
  }

  fs.rmSync(componentDirectory, { recursive: true, force: true });
  console.log(`Componente ${name} removido com sucesso.`);
}

// Função para desfazer a última criação
function undoLastComponent() {
  const historyFile = path.join(__dirname, './', 'history.txt');
  
  if (!fs.existsSync(historyFile)) {
    console.error('Nenhum histórico de criação encontrado.');
    process.exit(1);
  }

  const history = fs.readFileSync(historyFile, 'utf-8').split('\n').filter(Boolean);

  if (history.length === 0) {
    console.error('Nenhum componente para desfazer.');
    process.exit(1);
  }

  const lastComponent = history.pop();
  deleteComponent(lastComponent);

  fs.writeFileSync(historyFile, history.join('\n'));
}

// Verificar qual comando foi chamado
if (command === 'create' && componentName) {
  createComponent(componentName);
} else if (command === 'delete' && componentName) {
  deleteComponent(componentName);
} else if (command === 'undo') {
  undoLastComponent();
} else {
  console.error('Comando inválido. Use "create <nome>" ou "delete <nome>" ou "undo".');
  process.exit(1);
}
