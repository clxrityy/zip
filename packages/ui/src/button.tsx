"use client";
import { ComponentProps, CSSProperties, ReactNode } from "react";
import { config } from "./config";

export type ButtonProps = ComponentProps<"button"> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
};

const {
  colors: { primary, secondary, tertiary, light, dark },
  sizes: {
    text: { small, medium, large },
    padding: {
      small: paddingSmall,
      medium: paddingMedium,
      large: paddingLarge,
    },
  },
} = config;

export function Button({
  children,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: "1.5",
          whiteSpace: "nowrap",
          verticalAlign: "middle",
          transition: "background-color 0.3s, color 0.3s",
          // Custom styles based on variant and size
          backgroundColor:
            variant === "primary"
              ? primary
              : variant === "secondary"
                ? secondary
                : tertiary,
          color:
            variant === "primary"
              ? light
              : variant === "secondary"
                ? light
                : dark,
          padding:
            size === "small"
              ? paddingSmall
              : size === "medium"
                ? paddingMedium
                : paddingLarge,
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize:
            size === "small" ? small : size === "medium" ? medium : large,
          ...props.style, // Allow overriding styles via props
        } as CSSProperties
      }
    >
      {children ?? " "}
    </button>
  );
}
