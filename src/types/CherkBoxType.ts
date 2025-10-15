export interface CustomCheckboxProps {
    id: string;
    label: string;
    checked: boolean | "indeterminate";
    onCheckedChange: (checked: boolean | "indeterminate") => void;
    className?: string

}