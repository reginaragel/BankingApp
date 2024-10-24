
import './App.css';
import CreatePage from './components/CreatePage';
import Login from './components/Login';
import MainPage from './components/MainPage';
import {Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/sign' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
