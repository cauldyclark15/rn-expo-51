import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { FlatList, StyleSheet } from "react-native";
import { useAppState } from "@/hooks/appStateCtx";
import HomeRightSection from "@/components/HomeRightSection";
import HomeLeftSection from "@/components/HomeLeftSection";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const { isLandscaped } = useAppState();
  return (
    <ThemedView style={[styles.container]}>
      <StatusBar hidden={isLandscaped} />
      <FlatList
        data={[
          {
            id: 1,
            style: {
              flex: 1,
            },
            children: <HomeLeftSection />,
          },
          {
            id: 2,
            style: {
              width: 270,
            },
            hide: !isLandscaped,
            children: <HomeRightSection />,
          },
        ]}
        numColumns={isLandscaped ? 2 : 1}
        renderItem={({ item }) => {
          if (item.hide) {
            return null;
          }
          return (
            <ThemedView key={item.id} style={{ ...item.style }}>
              {item.children}
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
});
