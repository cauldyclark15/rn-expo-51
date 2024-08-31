import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";

export default function TimeAndDate() {
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
    <ThemedView style={{ marginLeft: 10 }}>
      <ThemedText style={styles.timeText}>{currentTime}</ThemedText>
      <ThemedText style={styles.timeText}>{currentDate}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
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
