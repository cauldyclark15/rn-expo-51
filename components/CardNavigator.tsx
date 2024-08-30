import React, { ReactNode } from "react";
import {
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Pressable,
} from "react-native";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface CardNavigatorProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  children?: ReactNode;
  onPress?: () => void;
  cardStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  imageStyle?: ImageStyle;
}

export default function CardNavigator({
  title,
  subtitle,
  imageUrl,
  children,
  onPress,
  cardStyle,
  titleStyle,
  subtitleStyle,
  imageStyle,
  contentStyle,
}: CardNavigatorProps) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.card,
          {
            backgroundColor: pressed ? "#bdbcbb" : "transparent",
          },
          cardStyle,
        ];
      }}
      onPress={onPress}
    >
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={[styles.image, imageStyle]} />
      )}
      <ThemedView style={[styles.content, contentStyle]}>
        {title && (
          <ThemedText style={[styles.title, titleStyle]}>{title}</ThemedText>
        )}
        {subtitle && (
          <ThemedText style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </ThemedText>
        )}
        {children}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 0.5,
    borderStyle: "solid",
  },
  content: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
});
