import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';


import './custom.css'
import  CustomerIndex  from './components/Customer/CustomerIndex';
import ProductIndex from './components/Products/ProductIndex';
import StoreIndex from './components/Stores/StoreIndex';
import SaleIndex from './components/Sales/SaleIndex';
import Footer from './components/Footer';



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={CustomerIndex} />
        <Route path='/Customer' component={CustomerIndex}/>
        <Route path='/Product' component={ProductIndex}/>
        <Route path='/Store' component={StoreIndex}/>
        <Route path='/Sale' component={SaleIndex}/>
        <Footer/>
      </Layout>
    );
  }
}

