import './App.css';
import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={Home}/>
    </Router>
  );
}

export default App;
