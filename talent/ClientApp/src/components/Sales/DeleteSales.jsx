import React, { } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

const DeleteSales = (props) => {
  const { open, deleteModal, sale, fetchSales } = props;

  const deleteSale = (id) => {
    axios.delete(`https://onboardingtalentr.azurewebsites.net/Sales/DeleteSales/${id}`)
      //axios.delete(`/Sales/DeleteSales/${id}`)
      .then(function (res) {
        console.log(res);
        deleteModal();
        fetchSales();
      })
  }

  // Semantic UI Form for Deleting Sale
  return (
    <Modal open={open} size="tiny">
      <Modal.Header>Delete Sale</Modal.Header>
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
          onClick={() => deleteSale(sale.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteSales
