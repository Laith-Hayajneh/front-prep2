
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import { CardGroup, Card } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';


class ApiData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: []
        };
    }
    componentDidMount = async () => {
        axios.get(`${process.env.REACT_APP_SERVER}/color?searchQuery=Amman`).then(result => {
            this.setState({
                color: result.data,
            })
        })
    }




    addFav= async (index)=>{
        // this is the request body

        const colorData  ={
            // email:this.props.auth0.user.email,
            colorTitle:this.state.color[index].clouds,
            colorDesc:this.state.color[index].description
        }
        console.log('colorDataa',colorData);
        try{

        const SERVER =process.env.REACT_APP_SERVER;

        await axios.post(`${SERVER}/api-data?email=${this.props.auth0.user.email}`,colorData);

        console.log('click',colorData);
    }catch (error){
        console.error(error);
    }


    }
    render() {
        return (
            <div>
                {this.state.color.map((element, index) => {
                    return (

                        <div key={index} className="movieCard">

                            <Card className="ItemCards">
                                <Card.Img variant="top" src={element.image_url} />
                                <Card.Body>
                                    <Card.Title>{element.clouds}</Card.Title>
                                    <Card.Title>{element.description}</Card.Title>
                                    {
                                        <Button variant="danger" onClick={()=>this.addFav(index)}>Add to Fav</Button>
                                    }
                                </Card.Body>
                            </Card>
                            {/* <CardGroup className='asd'>
                    
                    <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                      <Card.Body>
                          <Card.Title>{element.clouds}</Card.Title>
                          <Card.Text>
                             {element.description}
                             <br/>
                             {element.wind_cdir}
                          </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                      <Button variant="primary">Primary</Button>
                      </Card.Footer>
                  </Card>
  
                  </CardGroup> */}
                        </div>


                    )



                })}
            </div>
        )
    }
}
export default withAuth0(ApiData)