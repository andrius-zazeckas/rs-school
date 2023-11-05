import { Component, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  children: React.ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary">
          <h2>Error boundary</h2>
          <h3>{this.state.error && this.state.error.toString()}</h3>
          <p>{this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
