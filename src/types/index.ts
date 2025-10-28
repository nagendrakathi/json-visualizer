export interface ButtonProps {
    label: string;
    classnames?: string;
}

export interface JsonInputProps {
    value: string;
    handleChange: (newValue: string) => void;
}