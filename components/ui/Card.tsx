import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "flat" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "elevated",
  padding = "md",
}) => {
  const { colors, spacing } = useTheme();

  const getPadding = () => {
    switch (padding) {
      case "none":
        return 0;
      case "sm":
        return spacing.sm;
      case "md":
        return spacing.layout.padding; // 24
      case "lg":
        return spacing["3xl"];
      default:
        return spacing.md;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 2,
          borderRadius: 24, // Matches reference code meals card
          padding: getPadding(),
        },
        variant === "elevated" && {
          // Hard shadow simulated with CSS-like props if possible or just elevation
          // For now, simple shadow props that RN supports.
          // But to match the retro look strictly we might need the View-behind technique.
          // Let's stick to simple retro shadow for cards using standard props for now,
          // as creating a wrapper for every card might be overkill unless required.
          // Actually, the reference Card used 'shadow-retro' which is `4px 4px 0px 0px`.
          // React Native shadowOffset is for iOS only (and blurs).
          // For true cross platform hard shadow, the wrapper technique (like in Button) is best.
          // I'll keep it simple here but add a slight native shadow for depth if not using wrapper.
          // EDIT: Let's use the style override to allow parent to implement wrapper if needed,
          // or just rely on the border for now. The user "Cards" example in code.html line 412 has `shadow-retro`.

          // Adding consistent shadow style for iOS/Android where possible
          shadowColor: colors.shadow,
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4, // Android elevation doesn't support 0 blur radius easily
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden", // Ensures internal content respects border radius
  },
});
