import { render, screen } from '@testing-library/react';
import Landing from './Landing';

test('renders welcome text', () => {
  render(<Landing />);
  const linkElement = screen.getByText(/Bienvenido a mi proyecto individual/i);
  expect(linkElement).toBeInTheDocument();
});
