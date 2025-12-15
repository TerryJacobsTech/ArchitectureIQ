/**
 * Application Context
 * Provides dependencies to components via React Context
 * 
 * @format
 */

import React, {createContext, useContext, ReactNode} from 'react';
import {AnalyzeBuildingUseCase} from '../../application/usecases/AnalyzeBuildingUseCase';
import {dependencyContainer} from '../../infrastructure/di/DependencyContainer';

interface AppContextType {
  analyzeBuildingUseCase: AnalyzeBuildingUseCase;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({children}: AppProviderProps): React.JSX.Element {
  const analyzeBuildingUseCase = dependencyContainer.getAnalyzeBuildingUseCase();

  return (
    <AppContext.Provider value={{analyzeBuildingUseCase}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

