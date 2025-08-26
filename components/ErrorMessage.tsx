
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
      <strong className="font-bold">Oops! </strong>
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
