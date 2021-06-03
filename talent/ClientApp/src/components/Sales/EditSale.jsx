import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

const EditSale = (props) => {

    const { open, editModal, sale, fetchSales } = props;

    const [changeDate, setChangeDate] = useState(false)
    const [changeCustomer, setChangeCustomer] = useState(false)
    const [changeProduct, setChangeProduct] = useState(false)
    const [changeStore, setChangeStore] = useState(false)
    const [updateDate, setUpdateDate] = useState(sale.dateSold);
    const [updateProduct, setUpdateProduct] = useState(sale.productId);
    const [updateCustomer, setUpdateCustomer] = useState(sale.customerId);
    const [updateStore, setUpdateStore] = useState(sale.storeId);
    const [CusDropList, setCusDropList] = useState([])
    const [ProductDropList, setProductDropList] = useState([])
    const [StoreDropList, setStoreDropList] = useState([])
    const [dateErr, setDateErr] = useState({});
    const [customerErr, setCustomerErr] = useState({});
    const [productErr, setProductErr] = useState({});
    const [storeErr, setStoreErr] = useState({});

    useEffect(() => {
        if (sale.dateSold == null && sale.productId == null && sale.customerId == null && sale.storeId == null) {
            setUpdateDate(sale.dateSold)
            setUpdateProduct(sale.productId)
            setUpdateCustomer(sale.customerId)
            setUpdateStore(sale.storeId);

            CustomerList();
            ProductList();
            StoreList();
        }
    }, [updateDate, updateProduct, updateCustomer, updateStore])

    function CustomerList() {
        axios.get('https://onboardingtalentr.azurewebsites.net/Customers/GetCustomer')
            // axios.get('/Customers/GetCustomer')
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

        if (updateDate == "") {
            dateErr = "Please choose a date";
            isValid = false;
        }

        else if (updateCustomer == "") {
            customerErr = "Please choose Customer Name";
            isValid = false;
        }

        else if (updateProduct == "") {
            productErr = "Please choose a Product Name";
            isValid = false;
        }

        else if (updateStore == "") {
            storeErr = "Please choose a Store Name";
            isValid = false;
        }
        setDateErr(dateErr);
        setCustomerErr(customerErr);
        setProductErr(productErr);
        setStoreErr(storeErr);
        return isValid;
    }

    // Edit Sale Date 
    const editDate = (e) => {
        setUpdateDate(e.target.value)
        setChangeDate(true)
    }

    // Edit Sale Product
    const editProduct = (e) => {
        setUpdateProduct(e.target.value)
        setChangeProduct(true)
    }

    // Edit Sale Customer 
    const editCustomer = (e) => {
        setUpdateCustomer(e.target.value)
        setChangeCustomer(true)
    }

    // Edit Sale Store
    const editStore = (e) => {
        setUpdateStore(e.target.value)
        setChangeStore(true)
    }

    // Cancel edit Sale model
    const cancel = () => {
        setChangeDate(false);
        setChangeProduct(false);
        setChangeCustomer(false);
        setChangeStore(false);
        editModal();
    }

    //
    const editSale = (saleID) => {
        let sales = {
            id: saleID,
            customerId: changeCustomer ? updateCustomer : sale.customerId,
            productId: changeProduct ? updateProduct : sale.productId,
            storeId: changeStore ? updateStore : sale.storeId,
            dateSold: changeDate ? updateDate : sale.dateSold
        }
        setUpdateCustomer(changeCustomer ? updateCustomer : sale.customerId)
        setUpdateProduct(changeProduct ? updateProduct : sale.productId)
        setUpdateStore(changeStore ? updateStore : sale.storeId)
        setUpdateDate(changeDate ? updateDate : sale.dateSold);

        const isValid = validate();
        if (isValid) {
            axios.put(`https://onboardingtalentr.azurewebsites.net/Sales/PutSales/${saleID}`, sales)
                //axios.put(`/Sales/PutSales/${saleID}`, sales)
                .then(function (res) {
                    console.log(res);
                    setChangeDate(false)
                    setChangeProduct(false)
                    setChangeCustomer(false)
                    setChangeStore(false)
                    editModal();
                    fetchSales();
                })
        }
    }


    // Semantic UI Form for Editing Sale Details
    return (
        <Modal open={open} size="small" >
            <Modal.Header>Edit Sale</Modal.Header>
            <Modal.Description >

                <Form >

                    <Form.Field>
                        <label>Date Sold</label>
                        <input placeholder='Date Sold' defaultValue={sale.dateSold}
                            type='datetime-local'
                            onChange={(e) => editDate(e)} />
                    </Form.Field>
                    {Object.keys(dateErr).map((key) => {
                        return <span style={{ color: "red" }}>{dateErr[key]}</span>
                    })}
                    <hr />

                    <Form.Field>
                        <label>Customer</label>
                        <select class="ui dropdown" placeholder='Customer' defaultValue={sale.customerId}
                            onChange={(e) => editCustomer(e)} >
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
                        <select class="ui dropdown" placeholder='Product' defaultValue={sale.productId}
                            onChange={(e) => editProduct(e)} >
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
                        <select class="ui dropdown" placeholder='Store' defaultValue={sale.storeId}
                            onChange={(e) => editStore(e)} >
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
                <Button color='black' onClick={() => cancel()}>
                    Cancel
        </Button>
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => editSale(sale.id)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditSale