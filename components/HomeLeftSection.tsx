import { useAppState } from "@/hooks/appStateCtx";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { navData } from "@/constants/navData";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";
import Entypo from "@expo/vector-icons/Entypo";
import { useSession } from "@/hooks/sessionCtx";
import { Grid } from "./Grid";
import CardNavigator from "./CardNavigator";
import { Dimensions, StyleSheet } from "react-native";
import Fab from "./Fab";
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import TimeAndDate from "./TimeAndDate";

export default function HomeLeftSection() {
  const { homeCurrentView, isLandscaped, views } = useAppState();
  const { signOut } = useSession();
  const dimensions = Dimensions.get("window");

  const selectedNav =
    navData.find((nav) => nav.id === homeCurrentView) || navData[0];
  const filteredData = navData.filter((i) => views.includes(i.id));

  return (
    <ThemedView style={{ flex: 1 }}>
      {isLandscaped ? (
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 4,
            backgroundColor: "#edb458",
          }}
        >
          <ThemedText type="title" style={{ color: "white" }}>
            Synctimes - Over-the-Air (101)
          </ThemedText>
          <ThemedTouchableOpacity
            onPress={signOut}
            style={{
              backgroundColor: "#edb458",
            }}
          >
            <Entypo name="log-out" size={30} color="white" />
          </ThemedTouchableOpacity>
        </ThemedView>
      ) : null}

      <ThemedView
        style={{
          flexDirection: "column",
        }}
      >
        <Grid
          landscapeColumns={3}
          data={filteredData}
          renderItem={({ item }) => (
            <CardNavigator
              onPress={() => {}}
              cardStyle={{
                backgroundColor: "transparent",
                flex: 1,
                height: dimensions.height / 4 - 20,
              }}
              contentStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <Fab
                style={{
                  backgroundColor: item.backgroundColor,
                  borderColor: "transparent",
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
