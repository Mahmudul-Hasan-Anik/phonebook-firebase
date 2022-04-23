import React, { Component } from 'react'
import { Segment, Button, Form,Container, Header,Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { auth,signInWithEmailAndPassword } from '../firebase'

export default class Login extends Component {
    state = {
        email:'',
        password:'',
        errormsg:'',
        successmsg:''
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    isEmpty = ({email,number,password})=>{
        if(!email.length || !number.length || !password.length){
            this.setState({errormsg:'Fill all input Box'})
        }else{
            return true
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()

        const {email, password} = this.state
        if(this.isEmpty(this.state)){
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                this.setState({email:''})
                this.setState({password:''})
                this.setState({number:''})
                this.setState({errormsg:''})
                this.setState({successmsg:'Your registration is successful'}) 
            })
            .catch(() => {
                this.setState({errormsg:'Fill All input Box'})
            });
        }
    }
    render() {
        const {errormsg,successmsg} = this.state
        return (
         
            <Container style={{marginTop:'100px',width:'500px',textAlign:'center'}}>

                {errormsg?<Message error header={errormsg}/>:''}
                {successmsg?<Message positive header={successmsg}/>:''}

            <Segment>
                <Header>Login Your Account</Header>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <input placeholder='Email' type='email' name='email' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='password' type='password' name='password' onChange={this.handleChange}/>
                </Form.Field>
                
                <Button type='submit' fluid color='blue' onClick={this.handleSubmit}>Login</Button>

                <p>Create an account <Link to='/registration'>Registration</Link></p>
            </Form>
            </Segment>
            </Container>
        )
    }
}


