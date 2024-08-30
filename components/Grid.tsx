import { useAppState } from "@/hooks/appStateCtx";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface GridProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  hideColumnOnLandscape?: number[]; // Array of row/column indexes to hide in landscape
  columns?: number; // Number of columns in portrait mode
  landscapeColumns?: number; // Number of columns in landscape mode
}

export function Grid<T>({
  data,
  renderItem,
  hideColumnOnLandscape,
  columns = 1,
  landscapeColumns = 1,
}: GridProps<T>) {
  const { isLandscaped } = useAppState();

  const numColumns = isLandscaped ? landscapeColumns : columns;

  const filteredData =
    isLandscaped && hideColumnOnLandscape
      ? data.filter((_, index) => !hideColumnOnLandscape.includes(index))
      : data;

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      key={isLandscaped.toString()}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
});
