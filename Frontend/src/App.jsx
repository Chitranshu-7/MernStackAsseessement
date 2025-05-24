// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Login from './Login'


// function App() {


//   return (
//     <>

//       <div>

//         Home Page


//         <h2>Login</h2>
//         <Login />
//       </div>

//     </>
//   )
// }

// export default App


import { useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [tab, setTab] = useState('login');

  return (
    <div className="container">
      <div className="card">
        <div className="tab-buttons">
          <button
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={tab === 'signup' ? 'active' : ''}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>
        {tab === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default App;
