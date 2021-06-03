import React, { } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

const DeleteProduct = (props) => {
  const { open, deleteModal, product, fetchProduct } = props;

  const deleteProduct = (id) => {
    axios.delete(`https://onboardingtalentr.azurewebsites.net/Products/DeleteProduct/${id}`)
      //   axios.delete(`/Products/DeleteProduct/${id}`)
      .then(function (res) {
        console.log(res);
        deleteModal();
        fetchProduct();
      })
  }


  // Semantic UI Form for Deleting Product
  return (
    <Modal open={open} size="tiny">

      <Modal.Header>Delete Product</Modal.Header>
      <Modal.Description>
        <Header>Are you sure?</Header>
      </Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => deleteModal()}>
          Cancel
        </Button>
        <Button
          content="Yes"
          color='red'
          icon='checkmark'
          onClick={() => deleteProduct(product.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteProduct