import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './view/home';
import Daftar from './view/Register/Register';
import Masuk from './view/SignIn/signIn';
import Detail from './view/detail';
// import Register from './view/Register.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route index  path="/" element={<Home />} />
    <Route path="/masuk" element={<Masuk />} />
    <Route path="/daftar" element={<Daftar />} />
    <Route path="/detail" element={<Detail />} >
    <Route path=":detailId" element={<Detail />} />
    </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App;
