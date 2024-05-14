import React from 'react';

import { AuthenticatedUserProvider } from './authUserProvider';
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export function Routes() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}