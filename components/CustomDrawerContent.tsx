import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { ThemedView } from "@/components/ThemedView";
import { navData } from "@/constants/navData";
import { ThemedText } from "./ThemedText";
import { useAppState } from "@/hooks/appStateCtx";
import { useSession } from "@/hooks/sessionCtx";
import { Entypo } from "@expo/vector-icons";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const { signOut } = useSession();
  const { setHomeCurrentView, homeCurrentView } = useAppState();
  const size = Dimensions.get("window");

  return (
    <DrawerContentScrollView {...props}>
      <ThemedView style={[styles.drawerContent, { minHeight: size.height }]}>
        {navData.map((item, index) => (
          <DrawerItem
            key={index}
            label="BH"
            pressColor="#bdbcbb"
            style={[
              {
                backgroundColor:
                  homeCurrentView === item.id ? "#bdbcbb" : "transparent",
                marginRight: 20,
              },
            ]}
            onPress={() => {
              setHomeCurrentView(item.id);
              props.navigation.toggleDrawer();
            }}
            icon={(props) => {
              return (
                <ThemedView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "90%",
                    paddingLeft: 20,
                    backgroundColor:
                      homeCurrentView === item.id ? "#bdbcbb" : "transparent",
                  }}
                >
                  <ThemedView
                    style={{
                      width: 60,
                      flexDirection: "row",
                      backgroundColor:
                        homeCurrentView === item.id ? "#bdbcbb" : "transparent",
                    }}
                  >
                    {typeof item.icon === "function"
                      ? item.icon(props)
                      : item.icon}
                  </ThemedView>
                  {item.label ? (
                    <ThemedText type="subtitle" style={{ marginLeft: 6 }}>
                      {item.label}
                    </ThemedText>
                  ) : null}
                </ThemedView>
              );
            }}
          />
        ))}

        <DrawerItem
          label="Signout"
          pressColor="#bdbcbb"
          style={[
            {
              backgroundColor: "transparent",
              marginRight: 20,
            },
          ]}
          onPress={() => {
            signOut();
            props.navigation.toggleDrawer();
          }}
          icon={() => {
            return (
              <ThemedView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "90%",
                  paddingLeft: 20,
                  backgroundColor: "transparent",
                }}
              >
                <ThemedView
                  style={{
                    width: 60,
                    flexDirection: "row",
                    backgroundColor: "transparent",
                  }}
                >
                  <Entypo name="log-out" size={30} color="red" />
                </ThemedView>
                <ThemedText type="subtitle" style={{ marginLeft: 6 }}>
                  Sign out
                </ThemedText>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    borderRightColor: "gray",
    borderStyle: "solid",
    borderRightWidth: 0.5,
    marginRight: 4,
  },
  drawerIcon: {
    fontSize: 20,
    marginBottom: 10,
  },
});
