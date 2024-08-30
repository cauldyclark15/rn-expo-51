import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ThemedInput } from "../ThemedInput";
import { ThemedText } from "../ThemedText";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
}
export default function FirstNameInput<T extends FieldValues>({
  control,
  name = "first_name" as Path<T>,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{
        required: "First name is required",
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
            placeholder="First name"
            autoComplete="name-given"
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
