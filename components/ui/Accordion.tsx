import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeInUp,
  FadeOutUp,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Icon from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "../../context/ThemeContext";
import { Card } from "./Card";

interface AccordionProps {
  title: React.ReactNode;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  variant?: "breakfast" | "lunch" | "dinner" | "snacks" | "default";
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  rightContent,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  variant = "default",
}) => {
  const { colors } = useTheme();
  // We use internal state for uncontrolled usage, but sync with controlled if provided
  // Note: For a true robust accordion, exact height measurement is needed.
  // We'll use a 'maxHeight' animation approach or 'layout' animation if measuring is complex.
  // Reanimated layout transitions (Layout.Spring) are easiest for this.

  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const progress = useDerivedValue(() => {
    return isOpen
      ? withSpring(1, { damping: 15, stiffness: 150 })
      : withTiming(0, { duration: 200 });
  }, [isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  const getVariantColor = () => {
    switch (variant) {
      case "breakfast":
        return colors.activity5;
      case "lunch":
        return colors.activity6;
      case "dinner":
        return colors.activity7;
      case "snacks":
        return colors.activity8;
      default:
        return "transparent";
    }
  };

  const arrowStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 180], Extrapolation.CLAMP);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  // Using Layout Animation for content wrapper for easiest height animation
  // ensuring 'Entry' into the DOM and 'Exit' are handled smoothly would require
  // presence, but here we just keep it mounted and hide or use Entering/Exiting animations.
  // Ideally, use Animated.View with layout prop.

  return (
    <Card
      padding="none"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [styles.header, pressed && { backgroundColor: "rgba(0,0,0,0.02)" }]}
      >
        <View style={styles.headerContent}>
          {typeof title === "string" ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              {variant !== "default" && (
                <View style={[styles.iconCircle, { backgroundColor: getVariantColor() }]}>
                  <View
                    style={{ width: 8, height: 8, backgroundColor: colors.text, borderRadius: 4 }}
                  />
                </View>
              )}
              <View>{title}</View>
            </View>
          ) : (
            title
          )}
        </View>

        <View style={styles.rightSection}>
          {rightContent}
          <Animated.View style={arrowStyle}>
            <Icon name="expand-more" size={24} color={colors.text} />
          </Animated.View>
        </View>
      </Pressable>

      {/* 
         We render the content only if open or animating. 
         For simplicity with Reanimated v3, we can use Entering/Exiting or just a style style height. 
         Here we use the `entering` and `exiting` props if available, or just conditional rendering with Layout prop on wrapper.
      */}
      {isOpen && (
        <Animated.View
          entering={FadeInUp.duration(300).springify().damping(18).stiffness(120)}
          exiting={FadeOutUp.duration(200)}
          style={styles.content}
        >
          <View style={styles.contentInner}>{children}</View>
        </Animated.View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    minHeight: 64,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#171c0d",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    overflow: "hidden",
  },
  contentInner: {
    padding: 16,
    paddingTop: 0,
  },
});
