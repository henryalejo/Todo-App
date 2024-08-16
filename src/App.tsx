import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface RenderTodo extends Todo {
  handlerDelete: (id: string) => void;
}

const Item = (props: RenderTodo) => {  
  const {id, title, done, handlerDelete} = props;
  return (
    <div className="card">
      <div>{title}</div>
      <button onClick={()=>handlerDelete(id)}>Delete</button> 
    </div>)
};

const List = () => {  
  const [items, setItems] = useState<Array<Todo>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerAdd = () => {
    if (inputRef.current) {
      const title = inputRef.current.value;
      const newItems = [...items, {id: Date.now().toString(), title, done: false}];
      setItems(newItems);
      inputRef.current.value = '';
    }
  };

  const handlerDelete = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  return  (
    <div className='list'>
      <h1>TO DO APP</h1>
      <div className="inputContainer"><input ref={inputRef} type="text" placeholder="Add a task" />
      <button onClick={() =>handlerAdd()}>Add</button> </div>
      {items.map((item) => (
        <Item key={item.id} {...item} handlerDelete={handlerDelete}/>
      ))}
    </div>
  );
}

function App() {

  return (
    <List/>
  )
}

export default App
