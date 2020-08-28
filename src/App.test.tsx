import React, { ReactElement } from 'react';
import * as ReactDom from 'react-dom';
// import { getQueriesForElement } from '@testing-library/dom';
import { render, fireEvent, wait } from '@testing-library/react';
import * as userEvents from '@testing-library/user-event'; //can also use this to simulate user typing

import App from './App';
import { api } from './api';

// const render = (component: ReactElement) => {
//   const root = document.createElement('div');
//   ReactDom.render(component, root);
//   return getQueriesForElement(root);
// };

const mockCreateItem = (api.createItem = jest.fn());

// test('renders the correct content', async () => {
//   // expect(root.querySelector('h1')?.textContent).toBe('TODOS');
//   // expect(root.querySelector('label')?.textContent).toBe(
//   //   'What needs to be done?'
//   // );
//   // expect(root.querySelector('button')?.textContent).toBe('Add #1');

//   // const { getByText, getByLabelText } = render(<App />);

//   const { getByText, getByLabelText } = render(<App />);

//   expect(getByText('TODOS')).not.toBeNull();
//   expect(getByLabelText('What needs to be done?')); //notice you can ignore the .not.toBeNull()
//   expect(getByText('Add #1')).not.toBeNull();
// });

test('allows users to add items to their list', async () => {
  const todoText = 'hello friends';

  mockCreateItem.mockResolvedValueOnce({ id: 123, text: todoText });

  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText('What needs to be done?');
  fireEvent.change(input, { target: { value: todoText } });
  fireEvent.click(getByText('Add #1'));

  expect(mockCreateItem).toHaveBeenCalledTimes(1);
  expect(mockCreateItem).toHaveBeenCalledWith(
    '/items',
    expect.objectContaining({ text: todoText })
  );

  await wait(() => getByText(todoText));
  getByText('Add #2');
});
