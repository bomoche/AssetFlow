import React from 'react';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-stack-sm py-stack-lg text-on-surface-variant">
      <div className="w-5 h-5 border-2 border-outline-variant border-t-secondary rounded-full animate-spin" />
      <span className="font-body-sm text-body-sm">{message}</span>
    </div>
  );
}