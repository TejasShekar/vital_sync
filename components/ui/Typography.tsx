import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

import { useTheme } from "../../context/ThemeContext";

interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "bodySmall" | "label";
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  variant = "body",
  color,
  weight,
  align,
  ...props
}) => {
  const { colors, typography } = useTheme();

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "h1":
        return {
          fontFamily: typography.fonts.display,
          fontSize: typography.sizes["4xl"], // 36px
          fontWeight: typography.weights.bold as any,
          lineHeight: typography.sizes["4xl"] * 1.1,
          letterSpacing: -1,
        };
      case "h2":
        return {
          fontFamily: typography.fonts.display,
          fontSize: typography.sizes["2xl"], // 24px
          fontWeight: typography.weights.bold as any,
          lineHeight: typography.sizes["2xl"] * 1.2,
        };
      case "h3":
        return {
          fontFamily: typography.fonts.body,
          fontSize: typography.sizes.xl, // 20px
          fontWeight: typography.weights.bold as any,
        };
      case "body":
        return {
          fontFamily: typography.fonts.body,
          fontSize: typography.sizes.base, // 16px
          fontWeight: typography.weights.regular as any,
        };
      case "bodySmall":
        return {
          fontFamily: typography.fonts.body,
          fontSize: typography.sizes.sm, // 14px
          fontWeight: typography.weights.regular as any,
        };
      case "label":
        return {
          fontFamily: typography.fonts.body,
          fontSize: typography.sizes.xs, // 12px
          fontWeight: typography.weights.bold as any,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        };
      default:
        return {};
    }
  };

  const textStyle: TextStyle = {
    color: color || colors.text,
    textAlign: align,
    ...getVariantStyle(),
  };

  // Override weight if explicitly provided
  if (weight) {
    textStyle.fontWeight = typography.weights[weight] as any;
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};
