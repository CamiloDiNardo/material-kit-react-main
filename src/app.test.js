import { render, screen } from '@testing-library/react';
import App from './App';
import Router from './routes';

describe('App', () => {
  test('Test smoke de app', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const headings = screen.getAllByRole('heading');
    expect(headings).not.toBe('');
  });
});
