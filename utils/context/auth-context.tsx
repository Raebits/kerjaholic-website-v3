import React from 'react';
import ContextAuthProps from '../../types/context/context-auth-props';

const contextAuthValues: ContextAuthProps = {
    isAuth: false,
    setAuth: (val:false) => {}
};

const AppAuthContext = React.createContext<ContextAuthProps>(
    contextAuthValues
);

export default AppAuthContext;