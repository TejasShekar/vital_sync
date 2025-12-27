import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { useTheme } from "../../context/ThemeContext";
import { Typography } from "./Typography";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const { colors, typography, spacing } = useTheme();
  const isFocused = useSharedValue(false);
  const hasError = !!error;

  const handleFocus = (e: any) => {
    isFocused.value = true;
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    isFocused.value = false;
    onBlur?.(e);
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    let borderColor = colors.border;
    if (hasError) borderColor = colors.error;
    else if (isFocused.value) borderColor = colors.primary;

    return {
      borderColor: withTiming(borderColor, { duration: 200 }),
      backgroundColor: colors.surface,
      transform: [
        { translateX: withTiming(isFocused.value ? -2 : 0) },
        { translateY: withTiming(isFocused.value ? -2 : 0) },
      ],
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography variant="label" style={{ marginBottom: spacing.sm, opacity: 0.8 }}>
          {label}
        </Typography>
      )}

      <View>
        {/* Permanent Shadow: Offset 5px as per analysis */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.shadow,
              borderRadius: 4,
              transform: [{ translateX: 5 }, { translateY: 5 }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.inputContainer,
            animatedContainerStyle,
            {
              borderWidth: 2,
              borderRadius: 4, // 4px confirmed
            },
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                color: colors.text,
                fontFamily: typography.fonts.body,
                fontSize: typography.sizes.lg,
              },
              style,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </Animated.View>
      </View>

      {error && (
        <Typography variant="bodySmall" color={colors.error} style={{ marginTop: spacing.xs }}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56, // h-14
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
});
