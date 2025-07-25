import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Save error to state
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Oops! Something went wrong.</h1>
            <p className="text-secondary mb-4">
              We're sorry, but there was an issue loading this part of the site. Please try again later.
            </p>
            {/* Show error message or code if available */}
            {this.state.error && (
              <pre className="bg-gray-100 text-red-600 p-2 rounded mb-6">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-primary/90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;