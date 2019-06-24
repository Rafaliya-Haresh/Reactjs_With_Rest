import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Menu, Button } from "semantic-ui-react";
import { NotificationContainer } from 'react-notifications';
import Product from "../components/product";
import { onLogout } from "../actions/loginActions";

class Home extends PureComponent {

    componentWillMount() {
        const { store } = this.props;
        if(!store.isSuperUser) {
            this.props.history.push("/login")
        }
    }
    
    render() {
        const { store, onLogout } = this.props;
        return (
            <div>
                <Menu>
                    <Menu.Item>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='user'>
                           {store.userData}
                        </Menu.Item>
                        <Menu.Item name='user'>
                            <Button type="button" onClick={() => onLogout()}>Logout</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Product />
                <NotificationContainer />
            </div>
        );
    }
}

Home.propTypes = {
    store: PropTypes.object.isRequired,
    onLogout: PropTypes.func
}

const mapStateToProps = state => ({ 
    store: state.LoginStore 
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogout: () => dispatch(onLogout(ownProps.history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
