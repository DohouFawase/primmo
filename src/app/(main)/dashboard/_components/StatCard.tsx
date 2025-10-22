import React from 'react';
import StatLineComponent from './StatLineComponent'; 
import { StatCardData } from '@/types/CardTypes'; 
import { BORDER_COLOR_CLASS, HIGHLIGHT_COLOR_CLASS, BUTTON_BG_CLASS } from '@/constant/constant';

interface StatCardProps {
    data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
    const titleClasses = `${HIGHLIGHT_COLOR_CLASS} font-semibold text-lg mb-4`;
    
    const buttonClasses = `w-full mt-6 py-2 px-4 text-center text-white font-medium rounded-lg shadow-md transition duration-200 ${BUTTON_BG_CLASS}`;
    
    return (
        <div className={`
            p-8
            border-4 
            ${BORDER_COLOR_CLASS} 
            shadow
            shadow-[#007BFF2B]
            bg-white
            rounded-2xl
            h-auto
        `}>
            
            <h2 className={titleClasses}>
                {data.title}
            </h2>

            <div className="space-y-3">
                {data.lines.map((line, index) => (
                    <StatLineComponent key={index} line={line} />
                ))}
            </div>

            {data.button && (
                <div className="mt-4">
                    {data.button.href ? (
                        <a 
                            href={data.button.href} 
                            className={buttonClasses} 
                            role="button" 
                        >
                            {data.button.label}
                        </a>
                    ) : (
                        <button 
                            onClick={data.button.onClick} 
                            className={buttonClasses}
                        >
                            {data.button.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default StatCard;