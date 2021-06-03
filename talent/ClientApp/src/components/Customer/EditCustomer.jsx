import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const EditCustomer = (props) => {

  const { open, editModal, customer, fetchCustomer } = props;

  const [changeName, setNameChange] = useState(false)
  const [changeAddress, setChangeAddress] = useState(false)
  const [updateName, setUpdateName] = useState(customer.name);
  const [updateAddress, setUpdateAddress] = useState(customer.address);
  const [nameErr, setNameErr] = useState({});
  const [addressErr, setAddressErr] = useState({});

  useEffect(() => {
    if (customer.name == null && customer.address == null) {
      setUpdateName(customer.name)
      setUpdateAddress(customer.address);
    }
  }, [updateName, updateAddress])

  //Form Validation
  function validate() {

    let nameErr = {};
    let addressErr = {};
    let isValid = true;

    if (updateName == "") {
      nameErr['updateName'] = 'Please enter the Customer Name.';
      isValid = false;
    }
    else if (typeof updateName !== "undefined") {
      if (!updateName.match(/^[a-zA-Z ]*$/)) {
        nameErr["updateName"] = "Please enter Alphabet Characters only.";
        isValid = false;
      }
    }

    if (updateAddress == "") {
      addressErr['updateAddress'] = 'Please enter the Customer Address'
      isValid = false;
    }

    setNameErr(nameErr);
    setAddressErr(addressErr);
    return isValid;
  }

  // Edit customer name 
  const editName = (e) => {
    setUpdateName(e.target.value)
    setNameChange(true)
  }

  // Edit customer address
  const editAddress = (e) => {
    setUpdateAddress(e.target.value)
    setChangeAddress(true)
  }

  // Cancel edit customer model
  const cancel = () => {
    setNameChange(false);
    setChangeAddress(false);
    editModal();
  }

  //
  const editCustomer = (customerID) => {
    let customers = {
      id: customerID,
      name: changeName ? updateName : customer.name,
      address: changeAddress ? updateAddress : customer.address
    }
    setUpdateName(changeName ? updateName : customer.name)
    setUpdateAddress(changeAddress ? updateAddress : customer.address);
    const isValid = validate();
    if (isValid) {
      axios.put(`https://onboardingtalentr.azurewebsites.net/Customers/PutCustomer/${customerID}`, customers)
       //   axios.put(`/Customers/PutCustomer/${customerID}`, customers)
        .then(function (res) {
          console.log(res);
          setNameChange(false)
          setChangeAddress(false)
          editModal();
          fetchCustomer();
        })
    }
  }

  // Semantic UI Form for Editing Customer Details
  return (
    <Modal open={open} size="small">
      <Modal.Header>Edit Customer</Modal.Header>
      <Modal.Description>
        <Form>
          <Form.Field>
            <label>Customer Name</label>
            <input placeholder='Customer Name' name='updateName' type='text' defaultValue={customer.name} onChange={(e) => editName(e)} />
          </Form.Field>
          {Object.keys(nameErr).map((key) => {
            return <span style={{ color: "red" }}>{nameErr[key]}</span>
          })}
          <Form.Field>
            <label>Customer Address</label>
            <input placeholder='Customer Address' address='updateAddress' type='text' defaultValue={customer.address} onChange={(e) => editAddress(e)} />
          </Form.Field>
          {Object.keys(addressErr).map((key) => {
            return <span style={{ color: "red" }}>{addressErr[key]}</span>
          })}
        </Form></Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => cancel()}>
          Cancel
        </Button>
        <Button
          content="Edit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => editCustomer(customer.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomer