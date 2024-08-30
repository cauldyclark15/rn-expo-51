import { Href, Redirect, Slot } from "expo-router";
import React from "react";
import { useSession } from "@/hooks/sessionCtx";
import { ThemedText } from "@/components/ThemedText";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { ThemedView } from "@/components/ThemedView";
import { useAppState } from "@/hooks/appStateCtx";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { navData } from "@/constants/navData";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const {
    isLandscaped,
    isLoading: appStateLoading,
    homeCurrentView,
  } = useAppState();

  if (isLoading || appStateLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }
  if (!session) {
    return <Redirect href={"/sign-in" as Href} />;
  }

  const selectedNav = navData.find((nav) => nav.id === homeCurrentView);
  return (
    <ThemedView style={{ flex: 1 }}>
      {isLandscaped ? (
        <Slot />
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerPosition: "left",
              drawerType: "back",
              swipeEdgeWidth: 20,
              overlayColor: "transparent",
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Home",
                title: "Home",
                header() {
                  return (
                    <ThemedView
                      style={[
                        {
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          marginTop: 24,
                          backgroundColor: "#edb458",
                        },
                      ]}
                    >
                      <TouchableOpacity>
                        <Ionicons
                          name="reorder-three-outline"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>

                      <ThemedText
                        type="title"
                        style={{ color: "white", marginLeft: 10 }}
                      >
                        {selectedNav?.label}
                      </ThemedText>
                      {/*
                      <ThemedTouchableOpacity
                        onPress={signOut}
                        style={{
                          backgroundColor: "#edb458",
                        }}
                      >
                        <Entypo name="log-out" size={30} color="white" />
                      </ThemedTouchableOpacity>
                      **/}
                    </ThemedView>
                  );
                },
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      )}
    </ThemedView>
  );
}
