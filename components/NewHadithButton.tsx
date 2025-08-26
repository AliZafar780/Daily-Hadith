
import React from 'react';

interface NewHadithButtonProps {
  onClick: () => void;
}

const NewHadithButton: React.FC<NewHadithButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
      >
        Get a New Hadith
      </button>
    </div>
  );
};

export default NewHadithButton;
