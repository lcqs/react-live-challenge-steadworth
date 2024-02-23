import { render, screen } from '@testing-library/react';
import Home from '../src/app/page'; 
import '@testing-library/jest-dom';

test('renders the Page component', () => {
  render(<Home />);
  const h1 = screen.getByText('Welcome');
  expect(h1).toBeInTheDocument();
});