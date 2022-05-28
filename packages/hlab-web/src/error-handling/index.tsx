import { FC } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function getDisplayName(WrappedComponent: FC) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withErrorHandler<P extends object>(Component: FC<P>, Fallback: FC<FallbackProps>) {
  function ComponentWithErrorHandling(props: P) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...(props as P)} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
    Component as FC<unknown>,
  )}`;

  return ComponentWithErrorHandling;
}

export { withErrorHandler };
