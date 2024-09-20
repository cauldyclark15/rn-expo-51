import React, { useCallback, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions, StyleSheet } from "react-native";
import { useAppState } from "@/hooks/appStateCtx";
import HomeRightSection from "@/components/HomeRightSection";
import HomeLeftSection from "@/components/HomeLeftSection";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const dimensions = Dimensions.get("screen");
  const rightWidth = dimensions.width / 3;
  const [rightWidthComputed, setRightWidthComputed] = useState(rightWidth);

  useFocusEffect(
    useCallback(() => {
      async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
      }

      const dimensions = Dimensions.get("screen");
      const rightWidth = dimensions.width / 3;
      setRightWidthComputed(rightWidth);

      changeScreenOrientation();
    }, [])
  );

  const { isLandscaped } = useAppState();

  return (
    <ThemedView style={[styles.container]}>
      <StatusBar hidden={isLandscaped} />
      <ThemedView style={{ flex: 1, flexDirection: "row" }}>
        <ThemedView style={{ flex: 2 }}>
          <HomeLeftSection />
        </ThemedView>

        <ThemedView style={{ flex: 1 }}>
          <HomeRightSection />
        </ThemedView>
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
