import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import SignUp from './Pages/Login/SignUp/SignUp';
import Navbar from './Pages/Shared/Navbar/Navbar';
import NotFound from './Pages/Shared/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import Purchase from './Purchase/Purchase/Purchase';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile/MyProfile';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import AddReview from './Pages/Dashboard/AddReview/AddReview';
import ManageOrders from './Pages/Dashboard/ManageOrders/ManageOrders';
import AddProduct from './Pages/Dashboard/AddProduct/AddProduct';
import Users from './Pages/Dashboard/Users/Users';



function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='orders' element={<MyOrders></MyOrders>}></Route>
          <Route path='review' element={<AddReview></AddReview>}></Route>
          <Route path='manage' element={<ManageOrders></ManageOrders>}></Route>
          <Route path='add' element={<AddProduct></AddProduct>}></Route>
          <Route path='users' element={<Users></Users>}></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
