import { TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTouchableOpacity({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTouchableOpacityProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
