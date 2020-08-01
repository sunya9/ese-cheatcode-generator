import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('render without crash', () => {
    render(<App />);
  });
  test('generate cheat code', async () => {
    await act(async () => {
      render(<App />);
      const inputEl = await screen.findByTestId('input') as HTMLTextAreaElement
      const outputEl = await screen.findByTestId('output') as HTMLTextAreaElement
      fireEvent.change(inputEl, { target: { value: 'lorem'}})
      expect(outputEl.value).toEqual(expect.stringMatching(/^lorem\n\w{8} \w{8}$/))
      // multiple
      fireEvent.change(inputEl, { target: { value: 'lorem\nipsum'}})
      expect(outputEl.value).toEqual(expect.stringMatching(/^lorem\n\w{8} \w{8}\nipsum\n\w{8} \w{8}$/))
    })

  })
})
