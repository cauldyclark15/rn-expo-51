import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ThemedInput } from "../ThemedInput";
import { ThemedText } from "../ThemedText";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
}
export default function LastNameInput<T extends FieldValues>({
  control,
  name = "last_name" as Path<T>,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{
        required: "Last name is required",
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <ThemedInput
            placeholder="Last name"
            autoComplete="name-family"
            autoCapitalize="words"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          {error && <ThemedText type="error">{error.message}</ThemedText>}
        </>
      )}
      name={name}
    />
  );
}
