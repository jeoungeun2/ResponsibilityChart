import React from 'react';

interface ActionButtonProps {
  actionType: 'view' | 'inspect' | 'evaluate';
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  actionType,
  onClick,
  className = ''
}) => {
  const getButtonConfig = () => {
    switch (actionType) {
      case 'view':
        return {
          text: '상세보기',
          color: 'border-brand-300 text-brand-600 hover:bg-brand-100 bg-brand-50'
        };
      case 'inspect':
        return {
          text: '점검하기',
          color: 'border-gray-300 text-gray-600 hover:bg-gray-200'
        };
      case 'evaluate':
        return {
          text: '평가하기',
          color: 'border-gray-300 text-gray-600 hover:bg-gray-200'
        };
      default:
        return {
          text: '점검하기',
          color: 'border-gray-300 text-gray-600 hover:bg-gray-200'
        };
    }
  };

  const { text, color } = getButtonConfig();

  return (
    <button 
      className={`px-2 py-1 text-xs border transition-colors cursor-pointer ${color} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
