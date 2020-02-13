import React, { Component } from 'react';

import Aux from '../Auxil/Auxil';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideBar: false,
    }

    SideDrawerCloseHandler = () => {
        this.setState({ showSideBar: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideBar: !prevState.showSideBar }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideBar}
                    closed={this.SideDrawerCloseHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;