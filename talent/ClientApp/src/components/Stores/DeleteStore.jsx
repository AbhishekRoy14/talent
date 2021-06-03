import React, { } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

const DeleteStore = (props) => {
  const { open, deleteModal, store, fetchStore } = props;

  const deleteStore = (id) => {
    axios.delete(`https://onboardingtalentr.azurewebsites.net/Stores/DeleteStore/${id}`)
      // axios.delete(`/Stores/DeleteStore/${id}`)
      .then(function (res) {
        console.log(res);
        deleteModal();
        fetchStore();
      })
  }

  // Semantic UI Form for Deleting Store
  return (
    <Modal open={open} size="tiny">
      <Modal.Header>Delete Store</Modal.Header>
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
          onClick={() => deleteStore(store.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteStore