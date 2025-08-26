
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 text-center bg-white dark:bg-gray-800 shadow-md transition-colors duration-500">
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400 tracking-wider">
        Daily Hadith Reminder
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">A moment of reflection for your day</p>
    </header>
  );
};

export default Header;
