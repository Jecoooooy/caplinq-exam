import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
export { default as Button } from "./Button.vue";
import { cn } from "@/lib/utils";
type RemoveAutoVariant<T extends { variant?: string }> = Omit<T, "variant"> & {
    variant?: Exclude<T["variant"], "auto">;
};

type Props = {
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "tonal"
        | "secondary"
        | "ghost"
        | "link"
        | "auto";
    size?:
        | "default"
        | "sm"
        | "lg"
        | "icon-xs"
        | "icon-sm"
        | "icon-md"
        | "icon-lg";
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    icon?: boolean | "sm" | "md" | "lg";
    color?:
        | "primary"
        | "secondary"
        | "destructive"
        | "error"
        | "warning"
        | "info"
        | "success"
        | "accent"
        | "card"
        | "muted"
        | "popover";
};

export const buttonVariants = (baseProps: Props) => {
    const props: RemoveAutoVariant<Props> & { isAutoVariant: boolean } = {
        ...baseProps,
        isAutoVariant: baseProps.variant === "auto",
        variant: baseProps.variant === "auto" ? undefined : baseProps.variant,
    };

    const variants = {
        variant: {
            default: "bg-primary text-primary-foreground hover:brightness-110",
            destructive:
                "bg-destructive text-destructive-foreground hover:brightness-110",
            outline: "border backdrop-blur bg-transparent",
            tonal: "backdrop-blur-md hover:brightness-110",
            secondary:
                "bg-secondary text-secondary-foreground hover:brightness-110",
            ghost: "hover:brightness-110",
            link: " hover:brightness-110 underline-offset-4 decoration-2 hover:underline",
        },
        size: {
            default: "h-10 px-6 py-2",
            sm: "h-9 rounded-xs  px-4",
            lg: "h-11 rounded-xs px-8",
            "icon-xs": "size-8",
            "icon-sm": "size-9",
            "icon-md": "size-10",
            "icon-lg": "size-11",
        },
        elevation: {
            0: "shadow-none ",
            1: "shadow-sm active:shadow-sm hover:shadow-md dark:border-accent/20 dark:border dark:shadow-accent/20 ",
            2: "shadow-md active:shadow-md hover:shadow-lg dark:border-accent/20 dark:border dark:shadow-accent/20",
            3: "shadow-lg active:shadow-lg hover:shadow-xl dark:border-accent/20 dark:border dark:shadow-accent/20",
            4: "shadow-xl active:shadow-xl hover:shadow-2xl dark:border-accent/20 dark:border dark:shadow-accent/20",
            5: "shadow-[0px_2px_4px_rgba(255,255,255,0.7)_inset,_0px_2px_2px_rgba(0,0,0,0.5)] active:shadow-[0px_4px_6px_rgba(0,0,0,1)_inset]",
            6: "shadow-[0px_2px_4px_rgba(0,0,0,0.7)_inset] dark:shadow-[0px_4px_6px_rgba(0,0,0,1)_inset]",
        },
    };

    const color = props.color || "primary";
    Object.entries(variants.variant).forEach(([key, value]) => {
        variants.variant[key as keyof typeof variants.variant] = cn(
            value,
            key === "tonal" &&
                `text-${color} bg-${color}/10 dark:bg-${color}/40`,
            ["ghost", "link"].includes(key) && `text-${color}`,
            key === "outline" &&
                `text-${color} border-${color}/40 dark:border-${color}/60 hover:border-${color}`,
            key === "default" && `text-${color}-foreground bg-${color}`,
        );
    });

    return cva(
        "inline-flex cursor-pointer relative items-center justify-center whitespace-nowrap rounded-xs text-sm font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-25",
        {
            variants: variants,
            defaultVariants: {
                variant: "default",
                size: "default",
                elevation: 0,
            },
        },
    )(props);
};

export type ButtonVariants = VariantProps<typeof buttonVariants>;
