import React, { Component } from 'react'
import { Container, Segment, Button, Modal , Form,Menu} from 'semantic-ui-react'
import {getDatabase, ref, push, set,onValue} from '../firebase'

export default class Main extends Component {
    state = {
        allData : [],
        modal : false,
        name:'',
        number:'',
        moreInformation:''
    }

    openModal  = ()=>{
        this.setState({modal:true})
    }
    closeModal = ()=>{
        this.setState({modal:false})
    }
    
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = ()=>{

        const {name,number,moreInformation} = this.state

        const db = getDatabase();
        const postListRef = ref(db, 'posts');
        const newPostRef = push(postListRef);
        set(newPostRef, {
          name: name,
          number: number,
          moreInformation: moreInformation
        }).then(()=>{
            this.setState({name:''})
            this.setState({moreInformation:''})
            this.setState({number:''})
            this.setState({modal:false})
        })
    }

    componentDidMount(){
        const dataAfterLoad = []

        const db = getDatabase();
        const starCountRef = ref(db, 'posts' );
        onValue(starCountRef, (snapshot) => {
            snapshot.forEach((item)=>{
                dataAfterLoad.push(item.val())
            })
            this.setState({allData:dataAfterLoad})
        });
    }

    render() {
        const {modal,allData} = this.state
        return (
            <> 
            <Segment style={{height:'50px',fontSize:'16px',background:'skyblue'}}>
                <span style={{float:'left',color:"white"}}>Mahmudul Hasan</span>
                <span style={{float:'right',color:"white"}}>01817206782</span>
            </Segment>

            <Container style={{textAlign:'center',marginTop:'50px'}}>
                <button style={{width:'200px',height:'30px',border:'none',background:'skyblue',color:'white',borderRadius:'10px'}} onClick={this.openModal}>ADD</button>
            </Container>

            <Modal
            onClose={false}
            onOpen={true}
            open={modal}
            style={{textAlign:"center"}}
            >
            <Modal.Header>Add Information</Modal.Header>
            <Modal.Content >
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <input placeholder='Name' type='text' name='name' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='Phone Number' type='number' name='number' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                <input placeholder='Friend Or Family' type='text' name='moreInformation' onChange={this.handleChange}/>
                </Form.Field>
            </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button negative onClick={this.closeModal}>Cancel</Button>
                <Button  positive onClick={this.handleSubmit}>ADD</Button>
            </Modal.Actions>
            </Modal>


            {/* MENU FOR SHOW OUTPUT */}
            <Container>

            <Menu text vertical>
                <Menu.Item header>Member Information</Menu.Item>
                {allData.map((item)=>(
                <Menu.Item>
                    <span style={{fontWeight:'bolder'}}>Name :</span> {item.name}<br/> 
                    <span style={{fontWeight:'bolder'}}>Phone Number:</span>  {item.number}<br/> 
                    <span style={{fontWeight:'bolder'}}>Realtion:</span> {item.moreInformation}<br/> 
                </Menu.Item>
                ))}
            </Menu>
            </Container>

            </>
        )
    }
}
