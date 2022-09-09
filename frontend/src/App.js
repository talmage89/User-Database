import { Outlet } from 'react-router-dom';

import './App.css';

function App() {
  return(
    <div className='main'>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
