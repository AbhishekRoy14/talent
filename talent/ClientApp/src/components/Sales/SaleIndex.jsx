import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Grid, Dropdown } from 'semantic-ui-react';
import AddNewSale from './AddNewSale';
import EditSale from './EditSale';
import DeleteSales from './DeleteSales';


export default class SaleIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      openAddModal: false,
      openDeleteModal: false,
      openEditModal: false,
      sale: {},
      totalItem: 0,
      currentPage: 1,
      totalPages: 1,
      activeItem: 5
    };
    this.fetchSales = this.fetchSales.bind(this);
  }

  componentDidMount() {
    this.fetchSales();
  }


  //Fetch the Sale Data

  fetchSales() {
    axios.get('https://onboardingtalentr.azurewebsites.net/Sales/GetSales')
      //axios.get('/Sales/GetSales')
      .then((res) => {
        console.log(res.data);
        this.setState({
          sales: res.data,
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

  // Trigger open and close of Add Sale Model
  addModal = () => {
    this.setState({ openAddModal: !this.state.openAddModal })
  }

  // Trigger open and close of Delete Sale Model
  deleteModal = () => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal
    })
  }

  // Trigger open and close of Edit Sale Model
  editModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal
    })
  }

  // Passing and setting Sale details needs to be deleted
  setDeleteModal = (sale) => {
    this.setState({ sale: sale })
    this.deleteModal();
  }

  // Passing and setting Sale details needs to be edited
  setEditModal = (sale) => {
    this.setState({ sale: sale })
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

  // Semantic UI Form for Sale CURD
  render() {
    const sales = this.state.sales;
    const openAddModal = this.state.openAddModal;
    const openDeleteModal = this.state.openDeleteModal;
    const openEditModal = this.state.openEditModal;
    const sale = this.state.sale;
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
        <AddNewSale
          open={openAddModal}
          addModal={() => this.addModal()}
          fetchSales={() => this.fetchSales()} />

        <DeleteSales
          open={openDeleteModal}
          deleteModal={() => this.deleteModal()}
          fetchSales={() => this.fetchSales()}
          sale={sale} />

        <EditSale
          open={openEditModal}
          editModal={() => this.editModal()}
          fetchSales={() => this.fetchSales()}
          sale={sale} />
        <Button color='blue' content='Create Sale' onClick={this.addModal} />
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sales.map((s, index) => {
              let value = activeItem
              if ((index >= ((currentPage * value) - value)) && (index < (currentPage * value))) {
                return (
                  <Table.Row key={s.id}>
                    <Table.Cell>{s.customer.name}</Table.Cell>
                    <Table.Cell>{s.product.name}</Table.Cell>
                    <Table.Cell>{s.store.name}</Table.Cell>
                    <Table.Cell>{new Date(s.dateSold).toLocaleDateString()}</Table.Cell>
                    <Table.Cell><Button color='yellow' icon='edit' content='Edit' onClick={() => this.setEditModal(s)} /></Table.Cell>
                    <Table.Cell><Button color='red' icon='trash' content='Delete' onClick={() => this.setDeleteModal(s)} /></Table.Cell>
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
