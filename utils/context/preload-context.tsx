import React from 'react';
import PreloadContextState from '../../types/context/context-preload';

const contextPreloadValues: PreloadContextState = {
    isPreload: true,
    setPreload: (val:boolean) => {}   
};

const AppPreloadContext = React.createContext<PreloadContextState>(
    contextPreloadValues
);

export default AppPreloadContext;