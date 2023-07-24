import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {createBrowserRouter,Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import Product from './component/Product';
import Dashboard from './component/Dashboard';
import Cart from './component/Cart';
import RootLayout from './component/RootLayout';
import ProductDetailsPage from './component/ProductDetailsPage';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/:id" element={<ProductDetailsPage />} />

    </Route>
  ))

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Product /> */}
    </div>
  );
}

export default App;
