import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // We are not causing side effects here
        // We are only setting up our interceptors
        // It is okay to set those up here because it will be executed 
        // before the child components can reach out to the web
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});

                return request;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // When this component is unmounted (ex page change), we want to 
        // remove the axios interceptors
        // 
        // If these interceptors are not removed, they will continually run 
        // even though they are no longer valid
        // 
        // To do this, we just run axios.interceptors.[request/response].eject
        // You must pass a reference to the interceptor that as added
        // This is taken care of in our componentWillMount method by storing a reference 
        // to the interceptor as a property on this class
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;