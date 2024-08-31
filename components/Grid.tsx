import { useAppState } from "@/hooks/appStateCtx";
import React from "react";
import { FlatList, type StyleProp, type ViewStyle } from "react-native";

interface GridProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  hideColumnOnLandscape?: number[]; // Array of row/column indexes to hide in landscape
  columns?: number; // Number of columns in portrait mode
  landscapeColumns?: number; // Number of columns in landscape mode
  style?: StyleProp<ViewStyle>;
}

export function Grid<T>({
  data,
  renderItem,
  hideColumnOnLandscape,
  columns = 1,
  landscapeColumns = 1,
  style,
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
      contentContainerStyle={style}
      key={isLandscaped.toString()}
    />
  );
}
