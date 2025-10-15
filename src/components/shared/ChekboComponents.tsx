import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomCheckboxProps } from "@/types/CherkBoxType";

export function CustomCheckbox({
    id,
    label,
    checked,
    onCheckedChange,
    className
}: CustomCheckboxProps) {
    return (
        <div className={`${className}`}>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={`${className}`}
            />
            <Label htmlFor={id} className={`${className}`}>
                {label}
            </Label>
        </div>
    );
}