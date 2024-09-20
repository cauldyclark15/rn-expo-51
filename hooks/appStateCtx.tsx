import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useCallback,
} from "react";
import { useStorageState } from "./useStorage";
import * as ScreenOrientation from "expo-screen-orientation";
import { uniq } from "lodash";
import { useFocusEffect } from "expo-router";

const AppStateContext = createContext<{
  isLoading: boolean;
  orientation: ScreenOrientation.Orientation | undefined;
  isLandscaped: boolean;
  homeCurrentView: number;
  setHomeCurrentView: (value: number) => void;
  views: number[];
  updateViews: (value: number) => void;
}>({
  isLoading: false,
  orientation: ScreenOrientation.Orientation.LANDSCAPE_LEFT,
  isLandscaped: false,
  homeCurrentView: 1,
  setHomeCurrentView(_value) {},
  views: [],
  updateViews: (_value) => {},
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

  // useFocusEffect(
  //   useCallback(() => {
  //     async function changeScreenOrientation() {
  //       await ScreenOrientation.lockAsync(
  //         ScreenOrientation.OrientationLock.ALL
  //       );
  //     }

  //     changeScreenOrientation();
  //   }, [])
  // );

  function updateAppState(key: string, value: any) {
    const prevValue = JSON.parse(appState || "{}");
    setAppState(
      JSON.stringify({
        ...prevValue,
        [key]: value,
      })
    );
  }
  // refactor useEffect to use useFocusEffect
  // useFocusEffect(
  //   useCallback(() => {
  //     const subscription = ScreenOrientation.addOrientationChangeListener(
  //       (newOrientation) => {
  //         updateAppState(
  //           "orientation",
  //           newOrientation.orientationInfo.orientation
  //         );
  //       }
  //     );

  //     return () => subscription?.remove();
  //   }, [])
  // );

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
        views: state?.views || [],
        updateViews: (value) => {
          const currentViews = state?.views || [];

          if (currentViews.includes(value)) {
            updateAppState(
              "views",
              currentViews.filter((i: any) => i !== value)
            );

            return;
          }

          currentViews.push(value);
          const uniqueViews = uniq(currentViews);
          updateAppState("views", uniqueViews);
        },
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
