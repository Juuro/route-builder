import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Appp renders', () => {
  expect(render(<App />));
});
