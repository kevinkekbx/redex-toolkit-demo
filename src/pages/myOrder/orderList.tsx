import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../reduxStore/store";
/**
 * version 2: component receives `dispatch` props and dispatched the actions itself
 */

// needed for typescript only
// the component needs to know about the props that get added via `connect` in order to access them
interface MyComponentProps {
    increment: () => void;
    decrement: () => void;
    incrementAsync: any;
    count: number;
}

class OrderList extends React.Component<MyComponentProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <div>
               Order List
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
   
});

export default connect(mapStateToProps, { })(OrderList);
