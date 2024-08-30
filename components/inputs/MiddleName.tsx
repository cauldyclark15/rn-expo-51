import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ThemedInput } from "../ThemedInput";
import { ThemedText } from "../ThemedText";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
}
export default function MiddleNameInput<T extends FieldValues>({
  control,
  name = "middle_name" as Path<T>,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{
        maxLength: {
          value: 500,
          message: "Too long",
        },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <ThemedInput
            placeholder="Middle name"
            autoComplete="name-middle"
            onBlur={onBlur}
            autoCapitalize="words"
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
