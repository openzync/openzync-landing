import { ClassValue } from 'clsx';
import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

/** Merge Tailwind classes with conflict resolution */
declare function cn(...inputs: ClassValue[]): string;

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: React.ReactNode;
}
/**
 * Shared button component.
 * Matches the dashboard's Button component exactly.
 */
declare function Button({ className, variant, size, loading, icon, disabled, children, ...props }: ButtonProps): react.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "default" | "success" | "warning" | "error" | "info" | "brand" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, size, ...props }: BadgeProps): react.JSX.Element;

interface SpinnerProps {
    size?: number;
    className?: string;
}
/**
 * Lightweight SVG spinner used for loading states.
 */
declare function Spinner({ size, className }: SpinnerProps): react.JSX.Element;

export { Badge, type BadgeProps, Button, type ButtonProps, Spinner, cn };
