import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './Navbar';

class AddItem extends Component {

    

    state = {
        title: '',
        description: '',
        category: '',
        price: '',
        inventory: '',
        image: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        console.log(e.target.value);

        //this.image = e.target.files[0].name
        //this.image = e.target.files[0] || e.dataTransfer.files[0];
        //this.url = URL.createObjectURL(this.image);
        //this.image.setState({[e.target.name]:e.target.url});
        //console.log(this.state.image)
        //console.log(this.image);
    }

    
/*
    setPhoto = (e) => {
        this.image = e.target.files[0] || e.dataTransfer.files[0];
        this.url = URL.createObjectURL(this.image);
        this.setState({[e.target.name]:e.target.url});
        console.log(this.image.name)
        //console.log(image);
        console.log(this.url)

        const file = e.target.files[0]
        console.log(file.name);
    }
*/

    handleImage(e) {
        
        if (e.target.files) {
            const upload_image = e.target.files;
            //const imageData = new ImageData();
            //imageData.append('images', upload_image);

            console.log(upload_image);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();


        const newItem = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            price: this.state.price,
            inventory: this.state.inventory,
            image: this.image.name
            //image: this.url
            //image: this.state.image
            
        }

        await this.props.addItem(newItem);

        alert('Item added successfully');
        console.log(newItem);
    }

    render(){
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <h2 className="text-center mb-3">Add a new Item</h2>
                    { this.props.isAuthenticated ?
                    <Form action="/addItem" encType="multipart/form-data" method="POST">
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title of the item"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description of the item"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="category">Category</Label>
                            <Input 
                                type="text"
                                name="category" 
                                id="category"
                                placeholder="Category of the item"
                                onChange={this.onChange}
                                >
                            </Input>
                            <br/>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price of the item"
                                onChange={this.onChange}
                            />
                            <br/>
                              <Label for="inventory">Inventory</Label>
                            <Input
                                type="number"
                                name="inventory"
                                id="inventory"
                                placeholder="Quantity to add"
                                onChange={this.onChange}
                            />
                            <br/>

                            
                            <Label for="image">Upload Image</Label>
                            <Input type="file" 
                            name="image" 
                            accept="image/*"
                            id= "image"
                            //onChange= {this.setPhoto}
                            //onChange= {this.onChange}
                            onChange= {this.handleImage}
                            required
                            />
                            <Input type="submit" value="Upload Photo"  ></Input>
                            
                            
                            <br/>

                            <Button 
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                type="submit"
                            >Add Item</Button>
                        </FormGroup>
                    </Form> : 
                    <Alert className="text-center" color="danger">Login to add items!</Alert>
                    }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,{addItem})(AddItem);