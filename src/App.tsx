// @flow
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRouterConifg } from './router/index';
import './index.css';


export interface AppProps {
  fetchAccount: any;
  getToken: any;
  currentAccount: any;
  prePath?: any;
}

export interface AppState {
  routerConfig: {
    routers: any[];
    rootPath: string;
    isFree?: boolean;
  };
  flag: boolean;
  isHome: boolean;
}

class App extends React.Component<AppProps, AppState> {
  static propTypes: AppProps;
  constructor(props: any) {
    super(props);
    const routerConfig = getRouterConifg();
    this.state = {
      routerConfig,
      flag: true,
      isHome: false,
    };
    // !routerConfig.isFree &&
    //   this.props.getToken(() => {
    //     setTimeout(() => {
    //       const config = getRouterConifg();
    //       this.setState({ routerConfig: config });
    //     }, 0);
    //   });

  }

  render() {
    const { routers, rootPath } = this.state.routerConfig;
    console.log('routers',routers,rootPath)
    return (

        <Router>
         
          <Suspense fallback={<></>}>

            <Switch>
              {routers.map((router, i) => (
                <Route
                  key={i}
                  path={router.path}
                  component={router.component}
                  exact={router.exact}
                />
              ))}

              <Redirect path="/" to={rootPath} />
            </Switch>
          </Suspense>
        </Router>

    );
  }
}


const mapStateToProps = (state: any) => {
  return {
   
  };
};

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
