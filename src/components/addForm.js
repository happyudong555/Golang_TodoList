import React from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Input, notification } from 'antd';
export default class Addform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: [],
            email: []
        }
    }
    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    sumbit = (event) => {
        event.preventDefault();
        let insert = {
            name: this.state.name,
            email: this.state.email
        }
        axios.post(`http://localhost:1323/users`, insert).then((res) => {
            console.log(res.data)
        })
        setTimeout(()=> {
            notification.open({
                message: 'Successful',
                description:
                  'Add data to database successful',
                  icon: <img height={30} src={'https://cdn4.iconfinder.com/data/icons/computers-3/32/574-01-512.png'}/>,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
            })
        }, 1001)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.sumbit} style={{ marginBottom: 30 }}>
                    <Input style={{ width: 30 + '%', marginRight: 40 }}
                        type="name" name="name" placeholder="Name" onChange={this.handleName} />
                    <Input style={{ width: 30 + '%', marginRight: 40 }}
                        type="email" name="email" placeholder="Email" onChange={this.handleEmail} />
                    <button className="add" type="submit">Add</button>
                </form>
                <style>{`
                    .add {
                        height: 32px;
                        border: 0;
                        width: 100px;
                        border-radius: 4px;
                        background-color: red;
                        color: #fff;
                        cursor:pointer;
                    }
                `}</style>
            </div>
        )
    }
}