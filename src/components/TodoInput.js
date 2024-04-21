import React, { useState } from "react";
import { nanoid } from "nanoid";

// função do componente TodoInput
function TodoInput(props) {
  const [text, setText] = useState(''); // estado inicial do texto da task
  const [description, setDescription] = useState(''); // estado inicial da descrição da task

  // função para alterar o estado do texto da task de acordo com o input do usuário
  function handleChange(e) {
    setText(e.target.value);
  }

  // função para alterar o estado da descrição da task de acordo com o input do usuário
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  // função para lidar com o envio do formulario 
  function handleSubmit(e) { 
    e.preventDefault(); // previnir o default do formulario (não recarrega a página)
    if(text.trim() === ""){ // se o texto estiver vazio
      alert("Por favor, insira o conteúdo a ser adicionado."); // alerta o usuário
    } else if (text) { 
      props.onSubmit({ // chama a função onSubmit passando um objeto com o id, texto e descrição
        id: `todo-${nanoid()}`, // gera um id único para a task
        text: text,
        description: description 
      });
      setText(""); // reseta o estado do texto
      setDescription(""); // reseta o estado da descrição
    }
  }

  // retorna o formulário com o input do texto e da descrição da task, alem do botao de envio
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type="text"
        className='todo-input' 
        placeholder='Digite uma tarefa para adicionar à lista'
        value={text}
        onChange={handleChange}
        />
      <input
        type="text"
        className='todo-input' 
        placeholder='Digite uma descrição para a tarefa'
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit" style={{
        backgroundColor: '#D74C2E',
        border: 'none',
        color: 'white',
        padding: '0px 0px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '30px',
        margin: '2px 2px',
        cursor: 'pointer',
        fontFamily: 'Quicksand',
      }}>
      +
      </button>
    </form>
  )
  
}

export default TodoInput;