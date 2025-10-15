export interface RadioOption {
    id: string;
    label: string;
}

export interface CustomRadioGroupProps {
    title?: string;
    options: RadioOption[];
    value: string;
    onValueChange: (value: string) => void;
    name: string;
    className?: string
}
