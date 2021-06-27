import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout';
import Product from './views/products/Products';
;


const MainRouter = () => {
  return (<>
    <Switch>
      <MainLayout >
        <Route exact path="/ecommerce/admin" component={Product}/>
      </MainLayout>
    </Switch>

  </>)
}

export default MainRouter