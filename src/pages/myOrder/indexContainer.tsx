import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TestRedux from './testRedux';
import OrderList from './orderList';


export default function ContractContainer(props: any) {
  return (
    <Switch>
<Route exact path="/myOrder" component={OrderList} />
      <Route exact path="/test" component={TestRedux} />
    </Switch>
  );
}
