import { useState } from 'react';
import { nanoid } from "nanoid"; // biblioteca para gerar id unico para cada task
import ItemLista from '../components/ItemLista';
import TodoInput from '../components/TodoInput';

// objeto que mapeia nomes de filtros, mandando para funções que define se a task deve ser exibida ou não, a depender do seu status
const FILTER_MAP = {
  "Ver tudo": () => true, 
  "Tarefas Restante": (task) => !task.completed, 
  "Tarefas Feitas": (task) => task.completed, 
}


const FILTER_NAMES = Object.keys(FILTER_MAP); // pegando as chaves do objeto FILTER_MAP, ou seja, criando uma array com os nomes dos filtros

// função que renderiza a página principal da aplicação
function Home(props) {
  const [tasks, setTasks] = useState(props.tasks || []); // estado inicial da task, que pode ser passado por props ou como um array vazio
  const [filter, setFiltro] = useState("Ver tudo"); // estado inicial do filtro, que começa mostrando todas as tasks
  const [pesquisarTermo, setTermoBusca] = useState(''); // estado para controlar a barra de pesquisa, inicializando com valor vazio

  // função que muda o estado da task (completada ou não completada)
  function toggleTaskCompletada(id) {
    const updatedTasks = tasks.map((task) => { // mapeando todas as tasks
      if (id === task.id) { // se o id da task for igual ao id passado como argumento
        return { ...task, completed: !task.completed }; // alterna o estado de concluida
      }
      return task;
    });
    setTasks(updatedTasks); // atualiza o estado das tasks 
  }

  // função para deletar uma task pelo id
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id); // filtra todas as tasks, retornando apenas as que não tem o id passado como argumento
    setTasks(remainingTasks); // atualiz o estado das tasks
  }

  // atualiza a barra de pesquisa de acordo com o input do usuário na search bar
  const handleSearchChange = (event) => {
    setTermoBusca(event.target.value);
    
  };

  // filtra as tarefas se o tipo for string e se a task começar com o termo pesquisado
  const filteredTasks = tasks.filter((task) =>
  typeof task.text === 'string' && task.text.toLowerCase().startsWith(pesquisarTermo.toLowerCase())
);

// função para editar uma task, passando o id, o novo texto e a nova descrição
function editTask(id, newText, newDescription) {
  const editedTaskList = tasks.map((task) => { // mapeando todas as tasks
    if (id === task.id) { // se o id da task for igual ao id passado como argumento
      return { ...task, text: newText, description: newDescription }; // retorna a task com o novo texto e descrição
    }
    return task;
  });
  setTasks(editedTaskList); // atualiza o estado das tasks 
}

  // função para editar a descrição de uma task, passando o id e a nova descrição
  function editTaskDescricao(id, newDescription) {
    const editedTaskList = tasks.map((task) => { // mapeando todas as tasks
      if (id === task.id) { // se o id da task for igual ao id passado como argumento
        return { ...task, description: newDescription }; // retorna a task com a nova descrição
      }
      return task;
    });
    setTasks(editedTaskList); // atualiza o estado das tasks
  }

  // cria a lista de tarefas para ser exibida, aplicando o filtro escolhdo 
  const taskList = filteredTasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <ItemLista 
      id={task.id}
      text={task.text}
      completed={task.completed}
      key={task.id}
      toggleTaskCompletada={toggleTaskCompletada}
      deleteTask={deleteTask}
      editTask={editTask}
      description={task.description}
      editTaskDescricao={editTaskDescricao}
      filter={filter}
    />
  ));

  // função para adicionar uma task, passando o texto e a descrição
  function addTask(task) {
      if (!task.text.trim()) { // se o texto da task estiver vazio
    alert('Por favor, insira a tarefa.'); // alerta o usuário
    return;
  }
    const newTask = { id: `todo-${nanoid()}`, text: task.text, completed: false, description: task.description }; // cria uma nova task com o id gerado pela biblio nanoid
    setTasks([...tasks, newTask]); // adiciona a nova task ao estado das tasks
  }

  // conta quantas tarefas tem no filtro que o usuario selecionou
  const tasksCount = tasks.filter(FILTER_MAP[filter]).length;
  let filterLabel = "";
  switch (filter) {
    case "Ver tudo":
      filterLabel = 'Tarefas no total: ';
      break;
    case "Tarefas Restante":
      filterLabel = 'Tarefas restantes:';
      break;
    case "Tarefas Feitas":
      filterLabel = 'Tarefas feitas: ';
      break;
    default:
      break;
  }

  const message = tasksCount !== 0 ? `${filterLabel} ${tasksCount}` : ""; // mensagem que será exibida na tela, contando quantas tarefas tem no filtro selecionado

  // retorna a página principal da aplicação
  return (
    <>
    <div className="principal-header">
      <img 
          src="/logo.png" 
          alt="Logotipo" 
          className="header-logo"
        />
        <h1 className = "titulo-header" style={{ fontFamily: 'Quicksand, sans-serif', textAlign: 'center', marginTop: '20px',marginBottom: '20px',marginLeft: '50px', fontSize: '34px', fontWeight: 'bold' }}>
          Lista de Tarefas</h1>
    </div>
    <div className="wrapper">
      <h2 className="titulo-wrapper">O que será adicionado?</h2>

      <input
        type="text"
        className="todo-input"
        placeholder="Pesquise por tarefas"
        value={pesquisarTermo}
        onChange={handleSearchChange}
        style={{
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          width: '100%',
          outline: 'none',
          fontSize: '14px',
          marginBottom: '15px',
          fontFamily: 'Quicksand, sans-serif',
        }}
      />
  
      <TodoInput onSubmit={addTask}/>

      <ul className='list-wrap' >
        {taskList}
      </ul>

      <div className='todo-count'>
        {message}
      </div>
      
    </div>
    </>
  );
}

export default Home;