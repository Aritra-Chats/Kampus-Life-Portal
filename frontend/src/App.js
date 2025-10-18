import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunctionsContextProvider } from './context/functionsContext';

import Home from './pages/Home';
import Activity from './pages/Activities';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FunctionsContextProvider>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home />} />
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
