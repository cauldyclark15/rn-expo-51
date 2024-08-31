import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions, StyleSheet } from "react-native";
import { useAppState } from "@/hooks/appStateCtx";
import HomeRightSection from "@/components/HomeRightSection";
import HomeLeftSection from "@/components/HomeLeftSection";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Home() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  const { isLandscaped } = useAppState();
  const dimensions = Dimensions.get("screen");

  const rightWidth = dimensions.width / 3;
  return (
    <ThemedView style={[styles.container]}>
      <StatusBar hidden={isLandscaped} />
      <ThemedView style={{ flex: 1, flexDirection: "row" }}>
        <ThemedView style={{ flex: 1 }}>
          <HomeLeftSection />
        </ThemedView>
        {isLandscaped && (
          <ThemedView style={{ width: rightWidth, minWidth: 320 }}>
            <HomeRightSection />
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
});
