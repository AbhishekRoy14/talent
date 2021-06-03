import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const AddNewProduct = (props) => {
    const { open, addModal, fetchProduct } = props;
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [nameErr, setNameErr] = useState({});
    const [priceErr, setPriceErr] = useState({});


    useEffect(() => {
    }, [name, price])

    //Form Validation
    function validate() {
        let nameErr = {};
        let priceErr = {};
        let isValid = true;

        if (!name) {
            nameErr['name'] = 'Please enter the Product Name.';
            isValid = false;
        }
        else if (typeof name !== "undefined") {
            if (!name.match(/^[a-zA-Z ]*$/)) {
                nameErr["name"] = "Please enter Alphabet Characters only.";
                isValid = false;
            }
        }

        if (!price) {
            priceErr['price'] = 'Please enter the Product Price'
            isValid = false;
        }
        setNameErr(nameErr);
        setPriceErr(priceErr);
        return isValid;
    }

    //Add Product function
    const addProduct = () => {
        const isValid = validate();
        if (isValid) {
            axios.post('https://onboardingtalentr.azurewebsites.net/Products/PostProduct', {
                // axios.post('/Products/PostProduct', {
                name: name,
                price: price
            })
                .then(function (res) {
                    console.log(res);
                    fetchProduct();
                    resetData();
                    addModal();
                })
        }
    }


    // Re-setting Add Product Model fields to null
    const resetData = () => {
        setName(null)
        setPrice(null)
    }

    // Re-setting Add Product Model fields to null
    const cancel = () => {
        resetData();
        addModal();
    }

    // Semantic UI Form for Adding New Product
    return (
        <Modal

            open={open} size="small"
        >
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' value={name} type='text' onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    {Object.keys(nameErr).map((key) => {
                        return <span style={{ color: "red" }}>{nameErr[key]}</span>
                    })}
                    <Form.Field>
                        <label> Price</label>
                        <input placeholder='Price' type='number' onChange={(e) => setPrice(e.target.value)} />
                    </Form.Field>
                    {Object.keys(priceErr).map((key) => {
                        return <span style={{ color: "red" }}>{priceErr[key]}</span>
                    })}
                </Form>
            </Modal.Description>
            <Modal.Actions>
                <Button color='black' onClick={() => cancel()}>
                    Cancel
        </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => addProduct()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddNewProduct