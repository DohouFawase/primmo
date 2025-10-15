
import React, { useState } from 'react';

import { Slider } from "@/components/ui/slider"
export interface CustomRangeSliderProps {
    title: string;
    unit: string;
    min_value: number;
    max_value: number;
    current_min: number;
    current_max: number;
    step: number;

    onValueChange: (values: number[]) => void;
}

export function CustomRangeSlider({
    title,
    unit,
    min_value,
    max_value,
    current_min,
    current_max,
    step = 1,
}: CustomRangeSliderProps) {
    const [rangeValues, setRangeValues] = useState<number[]>([current_min, current_max]);

    const handleValueChange = (newValues: number[]) => {
        setRangeValues(newValues);

        console.log(`Nouvelle fourchette pour ${title} : ${newValues[0]}${unit} - ${newValues[1]}${unit}`);
    };

    const currentMinDisplay = rangeValues[0];
    const currentMaxDisplay = rangeValues[1];

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">{title}</h4>

            <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg p-3">
                <span className="text-base font-medium text-blue-600">{currentMinDisplay}{unit}</span>
                <span className="text-base font-medium text-blue-600">{currentMaxDisplay}{unit}</span>
            </div>

            <div className="px-1 pt-4 pb-2">
                <Slider
                    value={rangeValues}
                    onValueChange={handleValueChange}
                    min={min_value}
                    max={max_value}
                    step={step}
                    minStepsBetweenThumbs={0}
                />
            </div>
        </div>
    );
}