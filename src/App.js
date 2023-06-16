import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Movies from './Components/Movies/Movies';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import Home from './Components/Home/Home';
import Error404 from './Components/Error404/Error404';
import toast, { Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';
import Forgotpassword from './Components/Authentication/ForgotPassword/Forgotpassword';
import VerifyResetCode from './Components/Authentication/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword';
import UpdateLogedPassword from './Components/Authentication/updateLogedPassword/UpdateLogedPassword';
import UpdateLoggeduserdata from './Components/Authentication/UpdateLoggeduserdata/UpdateLoggeduserdata';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import TV from './Components/TV/TV';
import Person from './Components/Person/Person';
import Trending from './Components/Trending/Trending';



function App() {

useEffect(()=>{
if (localStorage.getItem("UserMovieToken")!=null) {
  saveUserData()
}
},[])


let [userData,setUserData]=useState(null)

// if you loged
function saveUserData()
{
 let encodedData=localStorage.getItem("UserMovieToken")
 let decodedData=jwtDecode(encodedData)
 setUserData(decodedData)
}
function logOut()
{
  setUserData(null)
  localStorage.clear()
  // localStorage.removeItem("UserMovieToken")
  return <Navigate to='/login'/>
}

let routers=createHashRouter([
  {path:"",element:<Layout logOut={logOut} userData={userData}/>,
  // children of layout
  children:
  [
    // if i loged in
    {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:"movies",element:<ProtectedRouting><Movies/></ProtectedRouting>},
    {path:"moviedetials/:movieId/:movieType",element:<ProtectedRouting><MovieDetails/></ProtectedRouting>},

    {path:"tv",element:<ProtectedRouting><TV/></ProtectedRouting>},
    {path:"person",element:<ProtectedRouting><Person/></ProtectedRouting>},


    {path:"trending",element:<ProtectedRouting><Trending/></ProtectedRouting>},




    // Authentication
    {path:"login",element: <Login saveUserData={saveUserData} userData={userData}/>},
    {path:"register",element:<Register/>},
    {path:"forgotpassword",element:<Forgotpassword/>},
    {path:"VerifyResetCode",element:<VerifyResetCode/>},
    {path:"ResetPassword",element:<ResetPassword/>},
    // if i loged in
    {path:"updateLogedPassword",element:<ProtectedRouting><UpdateLogedPassword logOut={logOut}/></ProtectedRouting>},
    {path:"UpdateLoggeduserdata",element:<ProtectedRouting><UpdateLoggeduserdata logOut={logOut}/></ProtectedRouting>},
    
    
    // error not found
    {path:"*",element:<Error404/>},
   


  ]}
])



  return <>
   <Toaster />
  <RouterProvider router={routers}/>
  </>
}

export default App;
