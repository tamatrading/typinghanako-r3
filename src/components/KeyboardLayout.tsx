import React from 'react';
import { cn } from '../lib/utils';
import { romajiMap } from '../constants/gameConstants';

interface KeyboardLayoutProps {
  activeKey: string;
  currentInput: string;
  showSuccessEffect: boolean;
}

const getNextExpectedKey = (word: string, currentInput: string): string => {
  if (!word) return '';
  
  // Handle direct input for F and J
  if (word === 'F' || word === 'J') {
    return word;
  }
  
  const romaji = romajiMap[word as keyof typeof romajiMap];
  if (!romaji) return '';
  
  // Find the first matching romaji pattern
  const matchingPattern = romaji.find(pattern => 
    pattern.startsWith(currentInput.toUpperCase())
  );
  
  if (!matchingPattern) return '';
  
  // Return the next expected key
  return matchingPattern[currentInput.length] || '';
}

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ activeKey, currentInput, showSuccessEffect }) => {
  const keyRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '^'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '@', '['],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', ':', ']'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\\']
  ];

  const isKeyActive = (key: string) => {
    const upperKey = key.toUpperCase();
    const nextKey = getNextExpectedKey(activeKey, currentInput);
    
    return upperKey === nextKey.toUpperCase();
  };

  return (
    <div className="flex flex-col items-center gap-1 bg-gray-800/90 p-4 rounded-lg shadow-inner">
      {keyRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`flex gap-1 ${
            rowIndex === 1 ? 'ml-[20px]' :
            rowIndex === 2 ? 'ml-[28px]' :
            rowIndex === 3 ? 'ml-[42px]' : ''
          }`}
        >
          {row.map((key) => (
            <div
              key={key}
              className={cn(
                "w-11 h-11 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-150 border border-gray-700",
                !showSuccessEffect && isKeyActive(key)
                  ? "bg-blue-500 text-white shadow-lg scale-95 border-blue-400"
                  : "bg-gray-700/90 text-gray-300 hover:bg-gray-600 shadow-sm"
              )}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className="flex gap-1 mt-1">
        <div className="w-[52px] h-11 bg-gray-700/90 rounded-md border border-gray-700 text-xs flex items-center justify-center text-gray-400">
          かな
        </div>
        <div className="w-[52px] h-11 bg-gray-700/90 rounded-md border border-gray-700 text-xs flex items-center justify-center text-gray-400">
          英数
        </div>
        <div className="w-[52px] h-11 bg-gray-700/90 rounded-md border border-gray-700 text-xs flex items-center justify-center text-gray-400">
          無変換
        </div>
        <div className="w-[200px] h-11 bg-gray-700/90 rounded-md border border-gray-700"></div>
        <div className="w-[52px] h-11 bg-gray-700/90 rounded-md border border-gray-700 text-xs flex items-center justify-center text-gray-400">
          変換
        </div>
        <div className="w-[52px] h-11 bg-gray-700/90 rounded-md border border-gray-700 text-xs flex items-center justify-center text-gray-400">
          カタカナ
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayout;