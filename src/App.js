import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './view/home';
import Register from './view/Register/Register';
import SignIn from './view/SignIn/signIn';
// import Register from './view/Register.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/SignIn" element={<SignIn />} />
    <Route path="/Register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App;
