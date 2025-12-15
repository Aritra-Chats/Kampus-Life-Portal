import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunctionsContextProvider } from './context/functionsContext';

import Home from './pages/Home';
import Activity from './pages/Activities';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FunctionsContextProvider>
          <div className='pages'>
            <Routes>
              <Route path='/Login' element={<Login />} />
              <Route path='/Home' element={<Home />} />
              <Route path='/Activity' element={<Activity />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </div>
        </FunctionsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
