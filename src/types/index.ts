export interface ButtonProps {
    label: string;
    classnames?: string;
    handleClick?: () => void;
}

export interface JsonInputProps {
    value: string;
    handleChange: (newValue: string) => void;
}