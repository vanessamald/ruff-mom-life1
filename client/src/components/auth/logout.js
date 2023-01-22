
import { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import {NavLink, Button} from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="user-links">
                <Fragment className="user-links">
                    <a className='user-links' onClick={this.props.logout} href="#">Logout</a>
                </Fragment>
            </div>
        )
    }
}

export default connect(null,{logout})(Logout);