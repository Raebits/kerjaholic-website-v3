import React from 'react';
import AppRedirectContextState from '../../types/context/context-provider-state';

const contextAppRedirectValues: AppRedirectContextState = {
    showAppRedirect: false,
    showAppRedirectMini: false,
    toggleAppRedirect: () => {},
    toggleAppRedirectMini: () => {}, 
    toggleAppRedirectFull: () => {}   
};

const AppRedirectContext = React.createContext<AppRedirectContextState>(
    contextAppRedirectValues
);

export default AppRedirectContext;