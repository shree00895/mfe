import React from 'react';
import ReactDom from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, onSignIn, defaultRouter, initialPath }) => {
    const history = defaultRouter || createMemoryHistory({
        initialEntries: [initialPath]
    });
    
    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(<App history={history} onSignIn={onSignIn} />, el);

    return {
        onParentNavigate({ pathname: nextPathname}) {
            const { pathname } = history.location;

            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if(devRoot) {
        mount(devRoot, {defaultRouter: createBrowserHistory()});
    }
};

export { mount };