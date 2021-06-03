import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Grid, Dropdown } from 'semantic-ui-react';
import AddNewStore from './AddNewStore';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';

export default class StoreIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      openAddModal: false,
      openDeleteModal: false,
      openEditModal: false,
      store: {},
      totalItem: 0,
      currentPage: 1,
      totalPages: 1,
      activeItem: 5
    };
    this.fetchStore = this.fetchStore.bind(this);
  }

  componentDidMount() {
    this.fetchStore();
  }

  //Fetch the Store Data

  fetchStore() {
    axios.get('https://onboardingtalentr.azurewebsites.net/Stores/GetStore')
      //axios.get('/Stores/GetStore')
      .then((res) => {
        console.log(res.data);
        this.setState({
          stores: res.data,
          totalItem: res.data.length,
          totalPages: Math.ceil(res.data.length / 5)
        })
        if (((res.data.length % 5) == 0) && (this.state.currentPage > Math.ceil(res.data.length / 5))) {
          this.setState({
            currentPage: (this.state.currentPage == 1) ? 1 : this.state.currentPage - 1
          })
        }
      })
  }

  // Trigger open and close of Add Store Model
  addModal = () => {
    this.setState({ openAddModal: !this.state.openAddModal })
  }

  // Trigger open and close of Delete Store Model
  deleteModal = () => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal
    })
  }

  // Trigger open and close of Edit Store Model
  editModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal
    })
  }

  // Passing and setting Store details needs to be deleted
  setDeleteModal = (store) => {
    this.setState({ store: store })
    this.deleteModal();
  }

  // Passing and setting Store details needs to be edited
  setEditModal = (store) => {
    this.setState({ store: store })
    this.editModal();
  }

  // Page Changing function for Pagination
  pageChange = (item, current) => {
    this.setState({
      currentPage: current.activePage,
      totalPages: current.totalPages
    })
  }

  handleInputChange = (e, { value }) => this.setState({ activeItem: value })


  // Semantic UI Form for Store CURD
  render() {
    const stores = this.state.stores;
    const openAddModal = this.state.openAddModal;
    const openDeleteModal = this.state.openDeleteModal;
    const openEditModal = this.state.openEditModal;
    const store = this.state.store;
    const totalItem = this.state.totalItem;
    const currentPage = this.state.currentPage;
    const { activeItem } = this.state

    const options = [
      { key: 1, text: '5', value: 5 },
      { key: 2, text: '10', value: 10 },
      { key: 3, text: '15', value: 15 },
      { key: 4, text: '20', value: 20 },
      { key: 5, text: 'All', value: 100 },
    ]

    return (
      <div>
        <AddNewStore
          open={openAddModal}
          addModal={() => this.addModal()}
          fetchStore={() => this.fetchStore()} />

        <DeleteStore
          open={openDeleteModal}
          deleteModal={() => this.deleteModal()}
          fetchStore={() => this.fetchStore()}
          store={store} />

        <EditStore
          open={openEditModal}
          editModal={() => this.editModal()}
          fetchStore={() => this.fetchStore()}
          store={store} />
        <Button color='blue' content='Create Store' onClick={this.addModal} />
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {stores.map((s, index) => {
              let value = activeItem
              if ((index >= ((currentPage * value) - value)) && (index < (currentPage * value))) {
                return (
                  <Table.Row key={s.id}>
                    <Table.Cell>{s.name}</Table.Cell>
                    <Table.Cell>{s.address}</Table.Cell>
                    <Table.Cell>
                      <Button color='yellow' icon='edit' content='Edit' onClick={() => this.setEditModal(s)} />
                    </Table.Cell>
                    <Table.Cell><Button color='red' icon='trash' content='Delete' onClick={() => this.setDeleteModal(s)} />
                    </Table.Cell>
                  </Table.Row>
                )
              }
            })}
          </Table.Body>
        </Table>

        <Grid id="grid-padding">
          <Grid.Column floated='left' width={5}>
            <Dropdown
              button
              options={options}
              onChange={this.handleInputChange}
              type='range'
              value={activeItem}
            />
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Pagination
              boundaryRange={1}
              activePage={currentPage}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={Math.ceil(totalItem) / activeItem}
              onPageChange={(item, current) => this.pageChange(item, current)}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}
