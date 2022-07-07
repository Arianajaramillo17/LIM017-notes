import { render, screen } from '@testing-library/react';
import App from './App';
import {createMemoryHistory} from 'history'
import Login from '../src/components/Login'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('render login', () => {
  const login = createMemoryHistory();
  const route = "/Login"
  login.push(route);
  render(
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  )
  expect(screen.getByTestId('root')).toHaveTextContent(route)
})