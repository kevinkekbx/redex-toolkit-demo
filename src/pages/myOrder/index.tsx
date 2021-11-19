import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../reduxStore/store';
import ContractContainer from './indexContainer';

export default class Approval extends Component {
    render() {
        return (
            <Provider store={store}>
                <ContractContainer />
            </Provider>
        );
    }
}
