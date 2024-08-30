import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ThemedInput } from "../ThemedInput";
import { ThemedText } from "../ThemedText";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
}
export default function PhoneInput<T extends FieldValues>({
  control,
  name = "phone" as Path<T>,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{
        pattern: {
          message: "Invalid phone",
          value: /^\+[1-9]{1}[0-9]{3,14}$/,
        },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <ThemedInput
            placeholder="Phone"
            autoComplete="tel"
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
