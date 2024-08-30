import React, { ReactNode } from "react";
import {
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface CardProps {
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

export default function Card({
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
}: CardProps) {
  return (
    <ThemedTouchableOpacity
      style={[styles.card, cardStyle]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
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
    </ThemedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
    overflow: "hidden",
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
