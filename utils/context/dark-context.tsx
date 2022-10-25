import React from 'react';
import ContextDarkProps from '../../types/context/context-dark-props';

const contextAuthValues: ContextDarkProps = {
    isDark: false,
    setDark: (val:false) => {}
};

const AppDarkContext = React.createContext<ContextDarkProps>(
    contextAuthValues
);

export default AppDarkContext;