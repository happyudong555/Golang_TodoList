import React from 'react';
import 'antd/dist/antd.css'
import { Card, Col, Row, Icon, Collapse, Input } from 'antd';
import Addform from '../src/components/addForm'
import axios from 'axios'
const { Panel } = Collapse;
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayImage: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-9/65385705_2563374337006636_5269415776833503232_o.jpg?_nc_cat=109&_nc_oc=AQmwKYBXyH1lK12HXUCJgcQniwukaecijMlGdvjuqWyy9msGGc6lX7hLsj9pfvV8KLMUt-VqTaOnALuDKGAv_1qj&_nc_ht=scontent.fbkk9-2.fna&oh=ae0c6210d1a163c021d719a0285119ec&oe=5D84F6D4',
      isloading: false,
      item_list: [],
      name: [],
      email: []
    }
  }
  componentDidMount() {
    this.myData();
  }
  componentDidUpdate() {
    this.myData();
  }
  myData() {
    axios.get(`http://localhost:1323/users`).then((res) => {
      if (res.data === null) {
        this.setState({
          item_list: []
        })
      } else {
        this.setState({
          item_list: res.data
        })
      }
    })
  }
  removeItem = (id) => {
    axios.delete(`http://localhost:1323/users/${id}`).then((res) => {
      console.log(res.data)
    });
  }
  handleName = (event)=> {
    this.setState({
      name: event.target.value
    })
  }
  handleEmail = (event)=> {
    this.setState({
      email: event.target.value
    })
  }
  update = (id)=> {
    let update = {
      name: this.state.name,
      email: this.state.email
    }
    axios.put(`http://localhost:1323/users/${id}`, update).then((res) => {
      console.log(res.data)
    });
    setTimeout(()=> {
      window.location.reload()
    },1002)
  }
  render() {
    return (
      <div>
        <div style={{ padding: '60px' }}>
          <img height={150} style={{ marginBottom: 32, borderRadius: 100 }} src={this.state.displayImage} />
          <span style={{ marginLeft: 34, fontSize: 40, fontWeight: 'bold' }}>Todo List</span>
          <br />
          <Addform />
          <h2>Item Total : {this.state.item_list.length}</h2>
          <Row gutter={22}>
            {
              !this.state.isloading && this.state.item_list.map((item) => (
                <Col span={8}>
                  <Icon onClick={this.removeItem.bind(this, item.ID)} className="removeItem" type="close-circle" />
                  <Card title={'Name : ' + item.name} bordered={true}>
                    Email : {item.email}
                  </Card>
                  <Collapse bordered={false}>
                    <Panel className="editTitle" showArrow={false} header={<div><Icon style={{fontSize:18}} type="edit" /><span style={{marginLeft:19}}>Edit Post</span></div>} key="1">
                    <Input type="name" name="name" placeholder="Name" onChange={this.handleName} style={{marginBottom:28}}/>
                    <Input type="email" name="email" placeholder="email" onChange={this.handleEmail} style={{marginBottom:28}}/>
                    <button onClick={this.update.bind(this,item.ID)} className="update">Update</button>
                    </Panel>
                  </Collapse>
                </Col>
              ))
            }
          </Row>
        </div>
        <style>{`
          body {
            background-color: #ECECEC;
          }
          .removeItem{
            float: right;
            z-index: 1;
            position: relative;
            right: 20px;
            top: 20px;
            font-size: 21px;
            cursor:pointer;
          }
          .removeItem:hover {
            color: red;
          }
          .editTitle div {
            padding-left: 10px;
          }
          .update {
            width:100%;
            height: 35px;
            border: 0;
            background-color: red;
            color: #fff;
            cursor:pointer;
          }
        `}</style>
      </div>
    )
  }
}
