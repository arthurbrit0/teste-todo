import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// função do componente ItemLista
function ItemLista(props) {
  const [boolEditando, setarEdicao] = useState(false); // estado inicial de edição, que começa como falso
  const [novoTexto, setarNovoTexto] = useState(""); // estado inicial do texto da task, que começa vazio
  const [novaDescricao, setarNovaDescricao] = useState(""); // estado inicial da descrição da task, que começa vazio

  // função para lidar com a mudança do texto da task
  function handleMud(e) {
    setarNovoTexto(e.target.value); // altera o estado do texto da task de acordo com o input do usuário
  }

  // função para lidar com o envio do formulario
  function handleSubmit(e) {
    e.preventDefault(); // previnir o default do formulario (não recarrega a página)
    const updatedTexto = novoTexto.trim() !== "" ? novoTexto : props.text; // se o novo texto não estiver vazio, atualiza o texto, senão mantém o texto original
    const updatedDescricao = novaDescricao.trim() !== "" ? novaDescricao : props.description; // se a nova descrição não estiver vazia, atualiza a descrição, senão mantém a descrição original
  
    if (updatedTexto === "" && updatedDescricao === "") { // verifica se ambos os campos estão vazios
      alert("Por favor, insira o conteúdo a ser editado."); // alerta o usuário
    } else {
      props.editTask(props.id, updatedTexto, updatedDescricao); // chama a função editTask passando o id, o novo texto e a nova descrição
      setarNovoTexto(""); // reseta o estado do texto
      setarNovaDescricao(""); // reseta o estado da descrição
      setarEdicao(false); // sai do modo de edição
    }
  }

  // inicia a edição configurando os estados com os valores atuais da tarefa
  const comecarEdicao = () => {
    setarNovoTexto(props.text);
    setarNovaDescricao(props.description || "");
    setarEdicao(true);
  };

  // template de edição, que limita os caracteres dos placeholders
  const PLACEHOLDER_MAX = 55;
  const TITULO_PREFIXO = "Título: ";
  const DESCRICAO_PREFIXO = "Descrição: ";

  // função para criar placeholders com texto truncado, limitando o tamanho máximo do texto
  function juntarTexto(texto, tamanhoMax, prefixo) {
    const textoTruncado = texto.length > tamanhoMax ? texto.slice(0, tamanhoMax - 3) + '...' : texto;
    return prefixo + textoTruncado;
  }
  
  // template para edição de uma task
  const editingTemplate = (
    <form className="edit-input" onSubmit={handleSubmit}>
      <div className="input-grupo">
        <input
          placeholder={juntarTexto(props.text, PLACEHOLDER_MAX, TITULO_PREFIXO)}
          id={props.id}
          className="todo-texto"
          type="text"
          value={novoTexto}
          onChange={handleMud}
        />
        <input
          placeholder={juntarTexto(props.description || "Sem descrição", PLACEHOLDER_MAX, DESCRICAO_PREFIXO)}  
          className="todo-texto"
          type="text"
          value={novaDescricao}
          onChange={(e) => setarNovaDescricao(e.target.value)}
        />
      </div>
      <div className="lista-botao-edit">
        <button 
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          type="button" 
          onClick={() => {setarNovoTexto(""); setarNovaDescricao(""); setarEdicao(false);}}>
          <CloseIcon style={{ color: '#D74C2E', fontSize: '24px' }} />
        </button>
        <button 
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          type="submit">
          <CheckIcon style={{ color: '#D74C2E', fontSize: '24px' }} />
        </button>
      </div>
    </form>
  );

  // template de visualização de uma task
  const viewTemplate = (
    <div className='list-item'>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <input
          id={props.id}
          className="todo-checkbox"
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompletada(props.id)}
        />
        <label
          className='todo-label'
          htmlFor={props.id}
          style={{textDecoration: props.completed ? "line-through" : "none"}}
        >
          {props.text}
        </label>
        <div className='lista-botao'>
          <EditIcon 
            style={{ color: '#D74C2E', fontSize: '24px', cursor: 'pointer' }}
            onClick={() => setarEdicao(true)}
          />
          <DeleteIcon
            style={{ color: '#D74C2E', fontSize: '24px', cursor: 'pointer' }}
            onClick={() => props.deleteTask(props.id)}
          />
        </div>
      </div>
      <div className="descricao-task">
        <p>{props.description}</p>
      </div>
    </div>
  );

  return <li>{boolEditando ? editingTemplate : viewTemplate}</li>; // retorna o template de edição ou visualização de acordo com o estado de edição
}

export default ItemLista; // exporta o componente ItemLista