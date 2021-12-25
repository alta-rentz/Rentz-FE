import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './view/home';
import Daftar from './view/Register/Register';
import Masuk from './view/SignIn/signIn';
import Detail from './view/detail';
import Cart from './view/cart';
import Product from './view/product';
import Rent from './view/rent';
import Checkout from './components/checkout';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route index  path="/" element={<Home />} />
    <Route path="/masuk" element={<Masuk />} >
    <Route path=":masukId" element={<Masuk />} />
     </Route> 
     <Route path="/daftar" element={<Daftar />} >
    <Route path=":daftarId" element={<Daftar />} />
     </Route> 
    <Route path="/detail" element={<Detail />} >
    <Route path=":detailId" element={<Detail />} />
    </Route>
    <Route path="/keranjang" element={<Cart />}/>
    <Route path="/checkout" element={<Checkout />}/>
    <Route path="/produk" element={<Product />}/>
    <Route path="/tambah_produk" element={<Rent />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
