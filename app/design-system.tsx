import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { ScreenWrapper } from "../components/ui/ScreenWrapper";
import { Typography } from "../components/ui/Typography";
import { useTheme } from "../context/ThemeContext";

export default function DesignSystemScreen() {
  const { colors, theme } = useTheme();

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Typography variant="h1" style={styles.header}>
            Design System
          </Typography>
          <Typography variant="body" color={colors.textMuted}>
            Theme: {theme.toUpperCase()} (Light Only)
          </Typography>
        </View>

        <View style={styles.divider} />

        {/* Buttons Section */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Buttons
          </Typography>
          <View style={styles.row}>
            <Button label="Primary Button" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <Button label="Secondary Button" variant="secondary" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            {/* Destructive Button */}
            <Button label="Destructive Action" variant="destructive" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <Button label="Disabled" disabled onPress={() => {}} />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Inputs Section */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Inputs
          </Typography>
          <Input label="Email" placeholder="hello@vital.sync" />
          <Input label="Password" placeholder="••••••••" secureTextEntry />
          <Input
            label="Error State"
            placeholder="Invalid input"
            value="Wrong Value"
            error="This field is required"
          />
        </View>

        <View style={styles.divider} />

        {/* Cards & Accordion Section */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Cards & Accordions
          </Typography>
          <Card>
            <Typography variant="h3">Standard Card</Typography>
            <Typography variant="body" style={{ marginTop: 8 }}>
              This is a standard card used for grouping content.
            </Typography>
          </Card>

          <View style={{ height: 20 }} />

          <Accordion
            title={<Typography variant="h3">Breakfast</Typography>}
            variant="breakfast"
            rightContent={<Typography variant="bodySmall">350 Kcal</Typography>}
          >
            <Typography variant="body">Oatmeal with Berries</Typography>
            <Typography variant="bodySmall" color={colors.textMuted}>
              345 kcal
            </Typography>
            <Button label="Add Item" style={{ marginTop: 12, height: 44 }} onPress={() => {}} />
          </Accordion>

          <View style={{ height: 16 }} />

          <Accordion
            title={<Typography variant="h3">Lunch</Typography>}
            variant="lunch"
            rightContent={<Typography variant="bodySmall">0 Kcal</Typography>}
          >
            <Typography variant="body" align="center" style={{ marginBottom: 16 }}>
              Time to refuel!
            </Typography>
            <Button label="Log Lunch" onPress={() => {}} />
          </Accordion>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 24,
    opacity: 0.3,
  },
  row: {
    marginBottom: 16,
  },
});
