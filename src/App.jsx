import Login from '../src/components/Login';
import Desembolso from './components/Desembolso';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path='' element={
            <Login />
          }></Route>

          <Route path='Desembolso' element={
            <Desembolso />
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;