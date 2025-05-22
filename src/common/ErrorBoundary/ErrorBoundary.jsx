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
      // Fallback UI 제공
      return this.props.fallback || <div>에러가 발생했습니다.</div>;
    }
    // 에러 없으면 children 렌더
    return this.props.children;
  }
}
export default ErrorBoundary;