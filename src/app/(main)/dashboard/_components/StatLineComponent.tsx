import { HIGHLIGHT_COLOR_CLASS } from '@/constant/constant';
import { StatLine } from '@/types/CardTypes';
import React from 'react';

const StatLineComponent: React.FC<{ line: StatLine }> = ({ line }) => {
  let valueClasses = `text-lg font-normal text-gray-900`;

  if (line.highlight) {
    if (typeof line.value === 'string') {
      valueClasses = `${HIGHLIGHT_COLOR_CLASS} font-semibold text-lg`;
    } else if (typeof line.value === 'number') {
      valueClasses = `${HIGHLIGHT_COLOR_CLASS} font-semibold text-lg`;
    }
  }

  if (typeof line.value === 'number' && !line.highlight) {
      valueClasses = `text-xl font-semibold text-gray-800`;
  }

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-lg font-normal text-gray-700">
        {line.label}
      </span>
      <span className={valueClasses}>
        {typeof line.value === 'number'
          ? line.value.toLocaleString('fr-FR')
          : line.value}
      </span>
    </div>
  );
};

export default StatLineComponent;

