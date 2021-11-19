import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { increment, decrement, incrementAsync } from "../../reduxStore/orderSlice";
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

class MyComponent extends React.Component<MyComponentProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.incrementAsync({ pageNum: 1, pageSize: 10 })
    }

    render() {
        return (
            <div>
                <h1>Count is {this.props.count}</h1>
                <button onClick={() => this.props.increment()}>
                    Increment
                </button>
                <button onClick={() => this.props.decrement()}>
                    Decrement
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    count: state.newOrder2.value,
    // demoData: state.newOrder2.demoData
});

export default connect(mapStateToProps, { increment, decrement, incrementAsync })(MyComponent);
