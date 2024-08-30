import { TextInput, StyleSheet, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "password";
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeHolderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "placeHolder",
  );

  return (
    <TextInput
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "password" ? { ...styles.default } : undefined,
        style,
      ]}
      autoCapitalize="none"
      placeholderTextColor={placeHolderColor}
      secureTextEntry={type === "password"}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    borderColor: "gray",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 4,
  },
  password: {},
});
