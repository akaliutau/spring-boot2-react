import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddTask from './components/AddTask';
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a snapshot', () => {
  const tree = renderer.create(<AddTask/>).toJSON();
  expect(tree).toMatchSnapshot();
});