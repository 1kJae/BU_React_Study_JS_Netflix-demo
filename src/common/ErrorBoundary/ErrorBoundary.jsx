import React from 'react';
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Caught error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>에러가 발생했습니다.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;