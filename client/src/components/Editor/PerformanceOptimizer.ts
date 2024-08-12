import React, { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  textDataUrl: string;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ textDataUrl }) => {
  const [textData, setTextData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch text data efficiently
  const fetchTextData = async (url: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      setTextData(text);
    } catch (error) {
      console.error('Failed to load text data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle lazy loading of text data
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTextData(textDataUrl);
    }, 200); // Delay fetching to prioritize other resources

    return () => clearTimeout(timeoutId);
  }, [textDataUrl]);

  // Function to render text data with optimized rendering technique
  const renderTextData = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div style={{ overflow: 'auto', height: '500px' }}>
        {textData}
      </div>
    );
  };

  return (
    <div>
      {renderTextData()}
    </div>
  );
};

export default PerformanceOptimizer;