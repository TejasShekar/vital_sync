import React from "react";
import { Pressable, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { useTheme } from "../../context/ThemeContext";
import { Typography } from "./Typography";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "destructive";
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  style,
  textStyle,
  icon,
  disabled,
}) => {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);

  const getBackgroundColor = () => {
    if (disabled) return "#e5e7eb";
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.surface;
      case "destructive":
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return "#9ca3af";
    switch (variant) {
      case "primary":
        return colors.text;
      case "secondary":
        return colors.text;
      case "destructive":
        return "#ffffff";
      default:
        return colors.text;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (disabled) return {};
    const translate = withTiming(pressed.value ? 2 : 0, { duration: 100 });
    return {
      transform: [{ translateX: translate }, { translateY: translate }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => !disabled && (pressed.value = 1)}
      onPressOut={() => !disabled && (pressed.value = 0)}
      disabled={disabled}
      style={() => [styles.container, style, { opacity: 1 }]}
    >
      {/* Hard Shadow Layer - Hidden for disabled */}
      {!disabled && (
        <Animated.View
          style={[
            styles.shadowLayer,
            {
              backgroundColor: colors.shadow,
              borderRadius: 12,
              transform: [{ translateX: 5 }, { translateY: 5 }], // 5px offset match
            },
          ]}
        />
      )}

      {/* Button Content Layer */}
      <Animated.View
        style={[
          styles.buttonLayer,
          animatedStyle,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: disabled ? "#d1d5db" : colors.border,
            borderWidth: 2,
            borderRadius: 12,
          },
        ]}
      >
        <View style={styles.content}>
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <Typography variant="label" style={[{ color: getTextColor(), fontSize: 16 }, textStyle]}>
            {label}
          </Typography>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56, // h-14
    width: "100%",
    position: "relative",
  },
  shadowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonLayer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
