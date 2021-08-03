import axios from 'axios'
import React, { Component } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import { CardGroup, Card, Button } from "react-bootstrap";
import UpdateFormModal from "./UpdateFormModal"
class MyFav extends Component {
    constructor(props) {
        super(props)
        this.state = {

            profileData: [],
            profile: {},
            showUpdateModel: false,
            id: ''



        }
    }

    componentDidMount = async () => {


        let server = process.env.REACT_APP_SERVER;

        let profileReader = await axios.get(`${server}/?email=${this.props.user.email}`)

        this.setState({
            profileData: profileReader.data
        })
        console.log('s2ssss', this.state.profileData)

        console.log('tttt', typeof (this.state.profileData))
        // console.log('ddddd', this.state.profileData.color[1].name)

        // ${this.props.auth0.user.email}

    }

    deleteHandler = async (id) => {
        let server = process.env.REACT_APP_SERVER;

        const colorData = await axios.delete(`${server}/${id}?email=${this.props.user.email}`);

        await this.setState({
            profileData: colorData.data

        })



    }




    handleClose = () => {

        this.setState({
            showUpdateModel: false
        })
    }

    updateModel = async (id) => {
        console.log('the is ',id)
        await this.setState({
            showUpdateModel: true,
            id: id,
            profile: this.state.profileData.find(items => {
                return items._id.toString() === id
            })
        })
        console.log('from update', this.state.profile);
    }



    updateHandler = async (e) => {
        e.preventDefault();
        console.log('you are updating')
        const colorFormData = {
            email: this.props.auth0.user.email,
            colorTitle:e.target.colorTitle.value,
            colorDesc:e.target.colorDesc.value
        }
        try{
            let server = process.env.REACT_APP_SERVER;

            const colorData =await axios.put(`${server}/${this.state.id}`,colorFormData);

            this.setState({
                profileData:colorData.data
            })

        


        }catch (error){
            console.error(error);
        }


    }





    render = () => {
        console.log('ccccc', typeof (this.state.profileData.color))

        return (
            <div>
                this is my fav
                <div>
                    {this.state.profileData.map(val => {
                        return (
                            <>
                                <Card style={{ width: '18rem' }}><Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            {val.name}
                                        </Card.Text>
                                        <Card.Text>
                                            {val.number}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => { this.updateModel(val._id) }}>update</Button>
                                        <UpdateFormModal show={this.state.showUpdateModel} updateBook={this.updateHandler} closing={this.handleClose} book={this.state.profile}/>

                                        <Button variant="secondary" onClick={() => this.deleteHandler(val._id)} >delete</Button>

                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default withAuth0(MyFav)