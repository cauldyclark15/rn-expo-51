import { Control, Controller, FieldValues } from "react-hook-form";
import { ThemedInput } from "../ThemedInput";
import { ThemedText } from "../ThemedText";

interface Props<T> {
  control: Control<T & FieldValues>;
}
export default function PasswordInput<T>({ control }: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{
        //required: "Password is required",
        //maxLength: {
        //  value: 200,
        //  message: "Maximum reached",
        //},
        //minLength: {
        //  value: 7,
        //  message: "Invalid password",
        //},
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <ThemedInput
            placeholder="Password"
            autoComplete="password"
            type="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          {error && <ThemedText type="error">{error.message}</ThemedText>}
        </>
      )}
      name={"password" as any}
    />
  );
}
