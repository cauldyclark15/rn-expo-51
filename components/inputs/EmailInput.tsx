import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ThemedText } from "../ThemedText";
import { ThemedInput } from "../ThemedInput";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
}
export default function EmailInput<T extends FieldValues>({
  control,
  name = "email" as Path<T>,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={
        {
          //required: "Email is required",
          //pattern: {
          //  message: "Invalid email",
          //  value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          //},
        }
      }
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <ThemedInput
            placeholder="Email"
            autoComplete="email"
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
