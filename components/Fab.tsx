import React from "react";
import { type ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

export type FabProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};
export default function Fab({ children, style, ...otherProps }: FabProps) {
  return (
    <ThemedView
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 44 / 2,
          borderStyle: "solid",
          borderColor: "transparent",
          borderWidth: 0.5,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </ThemedView>
  );
}
