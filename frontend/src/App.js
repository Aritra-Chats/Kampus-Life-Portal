import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunctionsContextProvider } from './context/functionsContext';

import Home from './pages/Home';
import Activity from './pages/Activities';
import Login from './pages/Login';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FunctionsContextProvider>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
              <Route path='/Activity' element={<ProtectedRoute> <Activity /> </ProtectedRoute>} />
              <Route path='*' element={<Login />} />
            </Routes>
          </div>
        </FunctionsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
