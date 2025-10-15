import { CustomRadioGroupProps } from '@/types/RadioTypes'
import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CustomRadioGroup({ title,
    options,
    value,
    onValueChange,
    name,
    className }: CustomRadioGroupProps) {
    return (
        <div className={`${className}`}>
            <h4 className={`${className}`}>{title}</h4>

            <RadioGroup
                onValueChange={onValueChange}
                value={value}
                name={name}
                className={`${className}`}
            >
                {options.map((option) => (
                    <div key={option.id} className={`${className}`}>
                        <RadioGroupItem value={option.id} id={option.id} />

                        <Label htmlFor={option.id} className={`${className}`}>
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}
