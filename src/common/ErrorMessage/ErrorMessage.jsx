import React from 'react';
function ErrorMessage({ error }) {
  return <div className="text-danger">⚠️ {error?.message || "에러 발생"}</div>;
}
export default ErrorMessage;