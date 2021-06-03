import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const AddNewSale = (props) => {
    const { open, addModal, fetchSales } = props;
    const [date, setDate] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [product, setProduct] = useState(null);
    const [store, setStore] = useState(null);
    const [CusDropList, setCusDropList] = useState([])
    const [ProductDropList, setProductDropList] = useState([])
    const [StoreDropList, setStoreDropList] = useState([])
    const [dateErr, setDateErr] = useState({});
    const [customerErr, setCustomerErr] = useState({});
    const [productErr, setProductErr] = useState({});
    const [storeErr, setStoreErr] = useState({});

    useEffect(() => {
        CustomerList();
        ProductList();
        StoreList();
    }, [date, customer, product, store])

    function CustomerList() {
        axios.get('https://onboardingtalentr.azurewebsites.net/Customers/GetCustomer')
            //axios.get('/Customers/GetCustomer')
            .then(res => {
                console.log(res.data);
                setCusDropList(res.data);
            })
    }

    function ProductList() {
        axios.get('https://onboardingtalentr.azurewebsites.net/Products/GetProduct')
            // axios.get('/Products/GetProduct')
            .then(res => {
                console.log(res.data);
                setProductDropList(res.data);
            })
    }

    function StoreList() {
        axios.get('https://onboardingtalentr.azurewebsites.net/Stores/GetStore')
            // axios.get('/Stores/GetStore')
            .then(res => {
                console.log(res.data);
                setStoreDropList(res.data);
            })
    }


    //Form Validation
    function validate() {
        let dateErr = {};
        let customerErr = {};
        let productErr = {};
        let storeErr = {};
        let isValid = true;

        if (!date) {
            dateErr = "Please choose a date";
            isValid = false;
        }

        else if (!customer) {
            customerErr = "Please choose customer";
            isValid = false;
        }

        else if (!product) {
            productErr = "Please choose a product";
            isValid = false;
        }

        else if (!store) {
            storeErr = "Please choose a store";
            isValid = false;
        }
        setDateErr(dateErr);
        setCustomerErr(customerErr);
        setProductErr(productErr);
        setStoreErr(storeErr);
        return isValid;
    }

    //Add Store function
    const addSale = () => {
        const isValid = validate();
        if (isValid) {
            axios.post('https://onboardingtalentr.azurewebsites.net/Sales/PostSales', {
                // axios.post('/Sales/PostSales', {
                dateSold: date,
                customerId: customer,
                productId: product,
                storeId: store
            })
                .then(function (res) {
                    console.log(res);
                    fetchSales();
                    resetData();
                    addModal();
                })
        }
    }

    // Re-setting Add Store Model fields to null
    const resetData = () => {
        setDate(null)
        setCustomer(null)
        setProduct(null)
        setStore(null)
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
                        <label>Date Sold</label>
                        <input placeholder='Date Sold'
                            type='Date'
                            onChange={(e) => setDate(e.target.value)} />
                    </Form.Field>
                    {Object.keys(dateErr).map((key) => {
                        return <span style={{ color: "red" }}>{dateErr[key]}</span>
                    })}
                    <hr />

                    <Form.Field>
                        <label>Customer</label>
                        <select class="ui dropdown" placeholder='Customer'
                            onChange={(e) => setCustomer(e.target.value)} >
                            <option value=''></option>
                            {CusDropList.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </Form.Field>
                    {Object.keys(customerErr).map((key) => {
                        return <span style={{ color: "red" }}>{customerErr[key]}</span>
                    })}
                    <hr />

                    <Form.Field>
                        <label>Product</label>
                        <select class="ui dropdown" placeholder='Product'
                            onChange={(e) => setProduct(e.target.value)} >
                            <option value=''></option>
                            {ProductDropList.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </Form.Field>
                    {Object.keys(productErr).map((key) => {
                        return <span style={{ color: "red" }}>{productErr[key]}</span>
                    })}
                    <hr />

                    <Form.Field>
                        <label>Store</label>
                        <select class="ui dropdown" placeholder='Store'
                            onChange={(e) => setStore(e.target.value)} >
                            <option value=''></option>
                            {StoreDropList.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </Form.Field>
                    {Object.keys(storeErr).map((key) => {
                        return <span style={{ color: "red" }}>{storeErr[key]}</span>
                    })}
                    <hr />

                </Form>
            </Modal.Description>
            <Modal.Actions>
                <Button color='black' onClick={() => cancel()}>Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => addSale()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddNewSale