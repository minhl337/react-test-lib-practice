import React from 'react';

import { api } from './api';

interface ItemNode {
  text: string;
  id: number;
}

export const App: React.FC = () => {
  const [items, setItems] = React.useState<ItemNode[]>([]);
  const [text, setText] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.length) {
      return;
    }

    const newItem = {
      text,
      id: Date.now(),
    };

    api.createItem('/items', newItem).then((persistedItem) => {
      setText('');
      setItems([...items, newItem]);
    });
  };

  return (
    <div>
      <h1>TODOS</h1>

      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor='new-todo'>What needs to be done?</label>
        <br />
        <input id='new-todo' value={text} onChange={handleChange} />
        <button>Add #{items.length + 1}</button>
      </form>
    </div>
  );
};

export default App;
