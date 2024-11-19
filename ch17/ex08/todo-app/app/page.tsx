'use client'; // 今回のメイン部分はすべてフロントエンドで実装する

import {useState} from 'react';

export default function Home() {
  const [todoList, setTodoList] = useState<{name: string; checked: boolean}[]>(
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = (
      event.target as HTMLFormElement
    )[0] as HTMLInputElement;
    const name = inputElement.value;
    inputElement.value = '';
    setTodoList([...todoList, {name, checked: false}]);
  };

  const handleCheckbox = (changeIdx: number) => {
    setTodoList(
      todoList.map((todo, index) =>
        index === changeIdx ? {...todo, checked: !todo.checked} : todo
      )
    );
  };

  const handleButton = (clickIdx: number) => {
    setTodoList(todoList.filter((todo, index) => index !== clickIdx));
  };

  return (
    <div>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list">
        {todoList.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                onChange={() => handleCheckbox(index)}
                checked={todo.checked}
              />
              <label
                style={{
                  textDecoration: todo.checked ? 'line-through' : 'none',
                }}
              >
                {todo.name}
              </label>
              <button onClick={() => handleButton(index)}>{'❌'}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
