import React, { ReactElement } from 'react';
import * as ReactDom from 'react-dom';
// import { getQueriesForElement } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

// const render = (component: ReactElement) => {
//   const root = document.createElement('div');
//   ReactDom.render(component, root);
//   return getQueriesForElement(root);
// };

test('renders the correct content', () => {
  // expect(root.querySelector('h1')?.textContent).toBe('TODOS');
  // expect(root.querySelector('label')?.textContent).toBe(
  //   'What needs to be done?'
  // );
  // expect(root.querySelector('button')?.textContent).toBe('Add #1');

  // const { getByText, getByLabelText } = render(<App />);

  const { getByText, getByLabelText } = render(<App />);

  expect(getByText('TODOS')).not.toBeNull();
  expect(getByLabelText('What needs to be done?')); //notice you can ignore the .not.toBeNull()
  expect(getByText('Add #1')).not.toBeNull();
});

test('allows users to add items to their list', () => {
  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'Buy some beans' } });
  fireEvent.click(getByText('Add #1'));
  getByText('Buy some beans');
  getByText('Add #2');
});
