"use client"

import React from "react";
import { HelpCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

class FaqErrorBoundary extends React.Component {
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
    console.error("FAQ Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8">
                <CardContent>
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Something went wrong
                  </h1>
                  <p className="text-gray-600 mb-6">
                    We're having trouble loading the FAQ section. This might be due to a temporary issue with our backend.
                  </p>
                  
                  {/* Show error message if available */}
                  {this.state.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                      <p className="text-sm text-red-800 font-medium mb-2">Error Details:</p>
                      <pre className="text-xs text-red-600 whitespace-pre-wrap">
                        {this.state.error.message || String(this.state.error)}
                      </pre>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      onClick={() => window.location.reload()}
                      className="w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    
                    <div className="text-sm text-gray-500">
                      If the problem persists, please contact our support team.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FaqErrorBoundary;
