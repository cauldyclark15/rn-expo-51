import React, { useEffect, useState } from "react";
import { Grid } from "@/components/Grid";
import Fab from "./Fab";
import CardNavigator from "./CardNavigator";
import { navData } from "@/constants/navData";
import { useAppState } from "@/hooks/appStateCtx";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeRightSection() {
  const { homeCurrentView, setHomeCurrentView } = useAppState();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const year = now.getFullYear();

      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
      setCurrentDate(`${month}/${day}/${year}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemedView>
      <Grid
        landscapeColumns={3}
        data={navData}
        renderItem={({ item }) => (
          <CardNavigator
            onPress={() => {
              setHomeCurrentView(item.id);
            }}
            cardStyle={{
              backgroundColor:
                homeCurrentView === item.id ? "#bdbcbb" : "transparent",
            }}
            contentStyle={{
              paddingVertical: 20,
              backgroundColor:
                homeCurrentView === item.id ? "#bdbcbb" : "transparent",
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

        <ThemedView style={{ marginLeft: 10 }}>
          <ThemedText style={styles.timeText}>{currentTime}</ThemedText>
          <ThemedText style={styles.timeText}>{currentDate}</ThemedText>
        </ThemedView>

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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 14,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "400",
    color: "gray",
    textAlign: "left",
  },
  iconsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 40, // Adjust to position above the bottom right corner
  },
  iconWrapper: {
    marginVertical: 15, // Spacing between icons
  },
  bottomIcon: {
    marginTop: 30, // Add more space for the lock icon at the bottom
  },
});
