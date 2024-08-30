import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "./useStorage";
import * as ScreenOrientation from "expo-screen-orientation";

const AppStateContext = createContext<{
  isLoading: boolean;
  orientation: ScreenOrientation.Orientation | undefined;
  isLandscaped: boolean;
  homeCurrentView: number;
  setHomeCurrentView: (value: number) => void;
}>({
  isLoading: false,
  orientation: ScreenOrientation.Orientation.UNKNOWN,
  isLandscaped: false,
  homeCurrentView: 1,
  setHomeCurrentView(_value) {},
});

// This hook can be used to access the user info.
export function useAppState() {
  const value = useContext(AppStateContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAppState must be wrapped in a <AppStateProvider />");
    }
  }

  return value;
}

export const Orientation = ScreenOrientation.Orientation;

export function AppStateProvider({ children }: PropsWithChildren) {
  const [[appStateIsLoading, appState], setAppState] = useStorageState("app");

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);

  function updateAppState(key: string, value: any) {
    const prevValue = JSON.parse(appState || "{}");
    setAppState(
      JSON.stringify({
        ...prevValue,
        [key]: value,
      }),
    );
  }

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (newOrientation) => {
        updateAppState(
          "orientation",
          newOrientation.orientationInfo.orientation,
        );
      },
    );
    return () => subscription?.remove();
  }, []);

  const state = JSON.parse(appState || "{}");
  const isLandscaped =
    state.orientation === Orientation.LANDSCAPE_LEFT ||
    state.orientation === Orientation.LANDSCAPE_RIGHT;

  return (
    <AppStateContext.Provider
      value={{
        isLoading: appStateIsLoading,
        orientation: state?.orientation,
        homeCurrentView: state?.homeCurrentView || 1,
        isLandscaped,
        setHomeCurrentView(value) {
          updateAppState("homeCurrentView", value);
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
