import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        // We are not causing side effects here
        // We are only setting up our interceptors
        // It is okay to set those up here because it will be executed 
        // before the child components can reach out to the web
        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);

            return request;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

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
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

            return (
                <Aux>
                    <Modal 
                        show={error} 
                        modalClosed={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
    }
}

export default withErrorHandler;