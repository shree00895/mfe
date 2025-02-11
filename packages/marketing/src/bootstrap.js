import React from 'react';
import ReactDom from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultRouter, initialPath }) => {
    const history = defaultRouter || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(<App history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname}) {
            const { pathname } = history.location;
            console.log('pa ', pathname);
                console.log(' new pa ', nextPathname);

            if(pathname !== nextPathname) {
                console.log('inside pa ', pathname);
                console.log('inside new pa ', nextPathname);
                history.push(nextPathname);
            }
        }
    }
};

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot) {
        mount(devRoot, {defaultRouter: createBrowserHistory()});
    }
};

export { mount };