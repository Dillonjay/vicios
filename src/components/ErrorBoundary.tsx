import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You can also log errors to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-8">Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300"
          >
            Refresh Page
          </button>
          <p className="mt-8 text-gray-400 text-sm">
            Error details: {this.state.error?.message || "Unknown error"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
