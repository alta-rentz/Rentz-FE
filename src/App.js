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
import History from './view/histori';
import Kategori from './view/kategori';
import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

const composeEnhancers = compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
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
    <Route path="/histori-pembayaran" element={<History />}/>
    <Route path="/kategori" element={<Kategori />}>
    <Route path=":detail" element={<Detail />} />
    </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  )
}

export default App;
