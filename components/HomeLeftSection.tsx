import { useAppState } from "@/hooks/appStateCtx";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { navData } from "@/constants/navData";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";
import Entypo from "@expo/vector-icons/Entypo";
import { useSession } from "@/hooks/sessionCtx";

export default function HomeLeftSection() {
  const { homeCurrentView, isLandscaped } = useAppState();
  const { signOut } = useSession();

  const selectedNav =
    navData.find((nav) => nav.id === homeCurrentView) || navData[0];

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
            {selectedNav?.label}
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
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          type="title"
          style={{
            marginVertical: 20,
          }}
        >
          Currently selected {selectedNav?.label}
        </ThemedText>
        {typeof selectedNav?.icon === "function"
          ? selectedNav.icon(undefined)
          : selectedNav?.icon}
      </ThemedView>
    </ThemedView>
  );
}
