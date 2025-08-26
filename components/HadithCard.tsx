
import React from 'react';
import type { Hadith } from '../types';

interface HadithCardProps {
  hadith: Hadith;
}

const HadithCard: React.FC<HadithCardProps> = ({ hadith }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 animate-fade-in">
      <div className="p-6 sm:p-8">
        
        <div className="mb-6 text-right">
          <p lang="ar" dir="rtl" className="font-amiri text-2xl md:text-3xl text-gray-800 dark:text-gray-100 leading-relaxed">
            {hadith.hadithText}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-base text-gray-600 dark:text-gray-300 italic">
            "{hadith.translation}"
          </p>
        </div>

        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <p><span className="font-semibold text-gray-700 dark:text-gray-200">Narrator:</span> {hadith.narrator}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-200">Source:</span> {hadith.source}</p>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 my-6"/>

        <div>
          <h2 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">Reflection</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-7 prose prose-gray dark:prose-invert max-w-none">
            {hadith.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HadithCard;
