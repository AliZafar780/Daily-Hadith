
import React, { useState, useEffect, useCallback } from 'react';
import type { Hadith } from './types';
import { fetchDailyHadith } from './services/geminiService';
import Header from './components/Header';
import HadithCard from './components/HadithCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import NewHadithButton from './components/NewHadithButton';

const App: React.FC = () => {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getHadith = useCallback(async (forceRefresh: boolean = false) => {
    setIsLoading(true);
    setError(null);

    const today = new Date().toDateString();
    const cachedData = localStorage.getItem('dailyHadith');

    if (!forceRefresh && cachedData) {
      try {
        const { date, hadithData } = JSON.parse(cachedData);
        if (date === today) {
          setHadith(hadithData);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cached Hadith", e);
        localStorage.removeItem('dailyHadith');
      }
    }
    
    try {
      const newHadith = await fetchDailyHadith();
      setHadith(newHadith);
      localStorage.setItem('dailyHadith', JSON.stringify({ date: today, hadithData: newHadith }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setHadith(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getHadith();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorMessage message={error} onRetry={() => getHadith(true)} />}
          {hadith && !isLoading && (
            <>
              <HadithCard hadith={hadith} />
              <NewHadithButton onClick={() => getHadith(true)} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
