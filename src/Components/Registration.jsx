import React, { Component } from 'react'
import { Segment, Button, Form,Container, Header,Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { auth,createUserWithEmailAndPassword,updateProfile  } from '../firebase'

export default class Registration extends Component {
    state = {
        name:'',
        email:'',
        number:'',
        password:'',
        errormsg:'',
        successmsg:''
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    isEmpty = ({email,number,password,name})=>{
        if(!email.length || !number.length || !password.length || !name.length){
            this.setState({errormsg:'Fill all input Box'})
        }else if(password.length < 6){
            this.setState({error:'Password must be 6 character or more'})
        }
        else{
            return true
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()

        const {email, password,name} = this.state
        if(this.isEmpty(this.state)){
        createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            updateProfile(auth.currentUser, {
                displayName: name
              })
        })
        .then(() => {
            this.setState({name:''})
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


    // writeUserData(user) {
    //     const {name,number} = this.state
    //     const db = getDatabase();
    //     set(ref(db, 'users/' + user.user.uid), {
    //       username: name,
    //       number: number
    //     });
    //   }

    render() {
        
        const {errormsg,successmsg,name,email,password,number} = this.state
        return (
         
            <Container style={{marginTop:'100px',width:'500px',textAlign:'center'}}>

                {errormsg?<Message error header={errormsg}/>:''}
                {successmsg?<Message positive header={successmsg}/>:''}
                
            <Segment>
                <Header>Create An Account</Header>
                <Form onSubmit={this.handleSubmit}>
                
                <Form.Field>
                <input placeholder='Name' type='text' name='name' onChange={this.handleChange} value={name}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='Email' type='email' name='email' onChange={this.handleChange} value={email}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='Phone Number' type='number' name='number' onChange={this.handleChange} value={number}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='password' type='password' name='password' onChange={this.handleChange} value={password}/>
                </Form.Field>
                
                <Button type='submit' fluid color='blue' onClick={this.handleSubmit}>Sign Up</Button>
                <p>Already have an account <Link to='/'>Login</Link></p>
            </Form>
            </Segment>
            </Container>
        )
    }
}
