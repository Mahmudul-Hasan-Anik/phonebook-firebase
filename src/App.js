import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Main from "./Components/Main";
import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom";
import { Component } from "react";
import { auth,onAuthStateChanged  } from "./firebase";
import { connect } from "react-redux";
import {setUser} from './Action/ActionIndex'

class App extends Component{
  state = {
    check: false
  }

  componentDidMount(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({check:true})
       
      } else {
        this.setState({check:false})
      }
    });
  }


  render(){
    const {check} = this.state
    return (
      <BrowserRouter>
        {check?
        <Routes>
        <Route path='/' element={<Navigate to='/main'/>}/>
        <Route path='/registration' element={<Navigate to='/main'/>}/>
        <Route path='/main' element={<Main/>}/>
        </Routes>
      :
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/main' element={<Main/>}/>
        </Routes>
      }
      </BrowserRouter>
    );
  }
}


export default connect(null, {setUser})(App)
