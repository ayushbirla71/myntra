import logo from './logo.svg';
import './App.css';
import Home from './screen/Home';
import SideBar from './components/SideBar';

function App() {
  return (
   <div className='flex h-screen w-full'>
    <SideBar/>
   </div>
  );
}

export default App;
