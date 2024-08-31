import React from "react";
import { Grid } from "@/components/Grid";
import Fab from "./Fab";
import CardNavigator from "./CardNavigator";
import { navData } from "@/constants/navData";
import { useAppState } from "@/hooks/appStateCtx";
import { ThemedView } from "./ThemedView";
import { Dimensions, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeAndDate from "./TimeAndDate";

export default function HomeRightSection() {
  const { views, updateViews } = useAppState();
  const dimensions = Dimensions.get("window");

  return (
    <ThemedView
      style={{
        flexDirection: "column",
      }}
    >
      <Grid
        landscapeColumns={3}
        data={navData}
        renderItem={({ item }) => (
          <CardNavigator
            onPress={() => {
              updateViews(item.id);
            }}
            cardStyle={{
              backgroundColor: views.includes(item.id)
                ? "#bdbcbb"
                : "transparent",
              flex: 1,
              height: dimensions.height / 4 - 20,
            }}
            contentStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: views.includes(item.id)
                ? "#bdbcbb"
                : "transparent",
            }}
          >
            <Fab
              style={{
                backgroundColor: item.backgroundColor,
                borderColor: item.borderColor || "transparent",
              }}
              children={
                typeof item.icon === "function"
                  ? item.icon(undefined)
                  : item.icon
              }
            />
          </CardNavigator>
        )}
      />
      <ThemedView style={styles.timeContainer}>
        <ThemedView>
          <AntDesign name="lock1" size={40} color="#ede65a" />
        </ThemedView>

        <TimeAndDate />

        <ThemedView style={{ marginLeft: 10 }}>
          <Octicons name="book" size={40} color="black" />
        </ThemedView>
        <ThemedView style={{ marginLeft: 10 }}>
          <FontAwesome name="bell" size={40} color="black" />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  iconsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 40,
  },
  iconWrapper: {
    marginVertical: 15,
  },
  bottomIcon: {
    marginTop: 30,
  },
});
