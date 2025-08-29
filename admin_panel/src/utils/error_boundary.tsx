import React, { type ReactNode, type ErrorInfo } from "react";

interface ErrorBouandaryProps {
  children: ReactNode;
  fallBack:string,
  onError: () => void;
}
interface ErrorBoundary {
  hasError: boolean;
  Error: Error | null;
  ErrorData: ErrorInfo | null;
}
class ErrorBoundaryComponent extends React.Component<
  ErrorBouandaryProps,
  ErrorBoundary
> {
  constructor(props: ErrorBouandaryProps) {
    super(props);
    this.state = {
      hasError: false,
      Error: null,
      ErrorData: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: any, info: any) {
    this.setState({ Error: err, ErrorData: info });
  }
  onError() {
    this.props.onError();
  }

  onRetrey() {
    this.setState({hasError:false,Error:null,ErrorData:null})
  }
  render() {
    if (this.state.hasError) {
        if(this.props.fallBack){
            return(
                <div>
                    <h3>{this.props.fallBack}</h3>
                    <button onClick={this.onRetrey}>retry</button>
                </div>
            )
        }
      return (
        <h3>
          something error
          {this.state.Error && (
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.Error.toString()}
              <br />
            </details>
          )}
          <button onClick={this.onError}>error back</button>
        </h3>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundaryComponent