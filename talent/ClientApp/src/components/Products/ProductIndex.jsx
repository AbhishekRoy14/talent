import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Grid, Dropdown } from 'semantic-ui-react';
import AddNewProduct from './AddNewProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

export default class ProductIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      openAddModal: false,
      openDeleteModal: false,
      openEditModal: false,
      product: {},
      totalItem: 0,
      currentPage: 1,
      totalPages: 1,
      activeItem: 5
    };
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  //Fetch the Products Data
  fetchProduct() {
    axios.get('https://onboardingtalentr.azurewebsites.net/Products/GetProduct')
      //axios.get('/Products/GetProduct')
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data,
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

  // Trigger open and close of Add Products Model
  addModal = () => {
    this.setState({ openAddModal: !this.state.openAddModal })
  }

  // Trigger open and close of Delete Product Model
  deleteModal = () => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal
    })
  }

  // Trigger open and close of Edit Product Model
  editModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal
    })
  }

  // Passing and setting Product details needs to be deleted
  setDeleteModal = (product) => {
    this.setState({ product: product })
    this.deleteModal();
  }

  // Passing and setting Product details needs to be edited
  setEditModal = (product) => {
    this.setState({ product: product })
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

  // Semantic UI Form for Product CURD
  render() {
    const products = this.state.products;
    const openAddModal = this.state.openAddModal;
    const openDeleteModal = this.state.openDeleteModal;
    const openEditModal = this.state.openEditModal;
    const product = this.state.product;
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
        <AddNewProduct
          open={openAddModal}
          addModal={() => this.addModal()}
          fetchProduct={() => this.fetchProduct()} />

        <DeleteProduct
          open={openDeleteModal}
          deleteModal={() => this.deleteModal()}
          fetchProduct={() => this.fetchProduct()}
          product={product} />

        <EditProduct
          open={openEditModal}
          editModal={() => this.editModal()}
          fetchProduct={() => this.fetchProduct()}
          product={product} />
        <Button color='blue' content='Create Product' onClick={this.addModal} />
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((p, index) => {
              let value = activeItem
              if ((index >= ((currentPage * value) - value)) && (index < (currentPage * value))) {
                return (
                  <Table.Row key={p.id}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>{p.price}</Table.Cell>
                    <Table.Cell>
                      <Button color='yellow' icon='edit' content='Edit' onClick={() => this.setEditModal(p)} />
                    </Table.Cell>
                    <Table.Cell><Button color='red' icon='trash' content='Delete' onClick={() => this.setDeleteModal(p)} />
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

