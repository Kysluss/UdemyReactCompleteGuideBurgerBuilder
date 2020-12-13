import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // We are not causing side effects here
    // We are only setting up our interceptors
    // It is okay to set those up here because it will be executed 
    // before the child components can reach out to the web
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);

        return request;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    // When this component is unmounted (ex page change), we want to 
    // remove the httpClient interceptors
    // 
    // If these interceptors are not removed, they will continually run 
    // even though they are no longer valid
    // 
    // To do this, we just run httpClient.interceptors.[request/response].eject
    // You must pass a reference to the interceptor that as added
    // This is taken care of in our componentWillMount method by storing a reference 
    // to the interceptor as a property on this class
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}