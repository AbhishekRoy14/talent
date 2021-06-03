import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const AddNewStore = (props) => {
    const { open, addModal, fetchStore } = props;
    const [name, setname] = useState(null);
    const [address, setaddress] = useState(null);
    const [nameErr, setNameErr] = useState({});
    const [addressErr, setAddressErr] = useState({});

    useEffect(() => {
    }, [name, address])

    //Form Validation
    function validate() {

        let nameErr = {};
        let addressErr = {};
        let isValid = true;

        if (!name) {
            nameErr['name'] = 'Please enter the Store Name.';
            isValid = false;
        }
        else if (typeof name !== "undefined") {
            if (!name.match(/^[a-zA-Z ]*$/)) {
                nameErr["name"] = "Please enter Alphabet Characters only.";
                isValid = false;
            }
        }

        if (!address) {
            addressErr['address'] = 'Please enter the Store Address'
            isValid = false;
        }

        setNameErr(nameErr);
        setAddressErr(addressErr);
        return isValid;
    }

    //Add Store function
    const addStore = () => {
        const isValid = validate();
        if (isValid) {
            axios.post('https://onboardingtalentr.azurewebsites.net/Stores/PostStore', {
                // axios.post('/Stores/PostStore', {
                name: name,
                address: address
            })
                .then(function (res) {
                    console.log(res);
                    fetchStore();
                    resetData();
                    addModal();
                })
        }
    }

    // Re-setting Add Store Model fields to null
    const resetData = () => {
        setname(null)
        setaddress(null)
    }

    // Re-setting Add Store Model fields to null
    const cancel = () => {
        resetData();
        addModal();
    }

    // Semantic UI Form for Adding New Store
    return (
        <Modal

            open={open} size="small"
        >
            <Modal.Header>Create Store</Modal.Header>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <label> Name</label>
                        <input placeholder='Name' value={name} type='text' onChange={(e) => setname(e.target.value)} />
                    </Form.Field>
                    {Object.keys(nameErr).map((key) => {
                        return <span style={{ color: "red" }}>{nameErr[key]}</span>
                    })}
                    <Form.Field>
                        <label> Address</label>
                        <input placeholder='Address' type='text' onChange={(e) => setaddress(e.target.value)} />
                    </Form.Field>
                    {Object.keys(addressErr).map((key) => {
                        return <span style={{ color: "red" }}>{addressErr[key]}</span>
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
                    onClick={() => addStore()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddNewStore