"use client"
import { StataData } from '@/mock/allData';
import React from 'react';
import StatCard from './_components/StatCard';
import FiltreComponents from '@/components/shared/FiltreComponents';

const DashboardPage: React.FC = () => {
    
    const handleUpgradeClick = () => {
        alert("Action 'Upgrader' déclenchée !");
    };
    
    const dataWithAction = StataData.map(card => {
        if (card.id === 'card-abonnement' && card.button) {
            return {
                ...card,
                button: {
                    ...card.button,
                    onClick: handleUpgradeClick 
                }
            };
        }
        return card;
    });

    return (
        <div className="max-w-7xl mx-auto px-8 md:px-16">
            
          <div className="space-y-3">
            <FiltreComponents/>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {dataWithAction.map((dataItem) => (
                    <StatCard key={dataItem.id} data={dataItem} />
                ))}
            </div>
          </div>
        </div>
    );
}

export default DashboardPage;