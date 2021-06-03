import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const EditProduct = (props) => {

  const { open, editModal, product, fetchProduct } = props;

  const [changeName, setNameChange] = useState(false)
  const [changePrice, setChangePrice] = useState(false)
  const [updateName, setUpdateName] = useState(product.name);
  const [updatePrice, setUpdatePrice] = useState(product.price);
  const [nameErr, setNameErr] = useState({});
  const [priceErr, setPriceErr] = useState({});

  useEffect(() => {
    if (product.name == null && product.price == null) {
      setUpdateName(product.name)
      setUpdatePrice(product.price);
    }
  }, [updateName, updatePrice])

  //Form Validation
  function validate() {
    let nameErr = {};
    let priceErr = {};
    let isValid = true;

    if (updateName == "") {
      nameErr['updateName'] = 'Please enter the Product Name.';
      isValid = false;
    }
    else if (typeof updateName !== "undefined") {
      if (!updateName.match(/^[a-zA-Z ]*$/)) {
        nameErr["updateName"] = "Please enter Alphabet Characters only.";
        isValid = false;
      }
    }

    if (updatePrice == "") {
      priceErr['updatePrice'] = 'Please enter the Product Price'
      isValid = false;
    }

    setNameErr(nameErr);
    setPriceErr(priceErr);
    return isValid;
  }

  // Edit product name 
  const editName = (e) => {
    setUpdateName(e.target.value)
    setNameChange(true)
  }

  // Edit product price
  const editPrice = (e) => {
    setUpdatePrice(e.target.value)
    setChangePrice(true)
  }

  // Cancel edit product model
  const cancel = () => {
    setNameChange(false);
    setChangePrice(false);
    editModal();
  }

  //
  const editProduct = (productID) => {
    let products = {
      id: productID,
      name: changeName ? updateName : product.name,
      price: changePrice ? updatePrice : product.price
    }
    setUpdateName(changeName ? updateName : product.name)
    setUpdatePrice(changePrice ? updatePrice : product.price);

    const isValid = validate();
    if (isValid) {
      axios.put(`https://onboardingtalentr.azurewebsites.net/Products/PutProduct/${productID}`, products)
        // axios.put(`/Products/PutProduct/${productID}`, products)
        .then(function (res) {
          console.log(res);
          setNameChange(false)
          setChangePrice(false)
          editModal();
          fetchProduct();
        })
    }
  }


  // Semantic UI Form for Editing product Details
  return (
    <Modal open={open} size="small">
      <Modal.Header>Edit product</Modal.Header>
      <Modal.Description>
        <Form>
          <Form.Field>
            <label> Name </label>
            <input placeholder=' Name ' name='updateName' defaultValue={product.name} id="myInput" onChange={(e) => editName(e)} />
          </Form.Field>
          {Object.keys(nameErr).map((key) => {
            return <span style={{ color: "red" }}>{nameErr[key]}</span>
          })}
          <Form.Field>
            <label> Price </label>
            <input placeholder='Price' name='updatePrice' type='number' defaultValue={product.price} onChange={(e) => editPrice(e)} />
          </Form.Field>
          {Object.keys(priceErr).map((key) => {
            return <span style={{ color: "red" }}>{priceErr[key]}</span>
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
          onClick={() => editProduct(product.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditProduct