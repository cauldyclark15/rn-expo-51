import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/sessionCtx";
import { useForm, SubmitHandler } from "react-hook-form";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import { ThemedButton } from "@/components/ThemedButton";
import Toast from "react-native-root-toast";
import { useAppState } from "@/hooks/appStateCtx";
import * as ScreenOrientation from "expo-screen-orientation";

type FormData = {
  email: string;
  password: string;
};
export default function Signin() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const { signIn } = useSession();
  const {} = useAppState();
  const {
    formState: { errors },
    control,
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (_data) => {
    signIn();
  };

  async function resendActivationLink() {
    clearErrors();
    reset();
    Toast.show("Request sent. Please check your email", {
      duration: Toast.durations.LONG,
    });
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "white", dark: "white" }}
      headerImage={
        <Image
          source={require("@/assets/images/synctimes-with-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome back!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <EmailInput control={control} />
        <PasswordInput control={control} />
        {errors && (
          <>
            {Object.entries(errors).map(([field, message], index) => {
              let Button;
              if (field === "account") {
                if (
                  message.message ===
                  "Oops! You must verify your account first. Check your email for the activation link."
                ) {
                  Button = (
                    <TouchableOpacity
                      style={styles.loginScreenButton}
                      onPress={() => {
                        resendActivationLink();
                      }}
                    >
                      <ThemedText style={styles.resendText}>
                        Resend activation link
                      </ThemedText>
                    </TouchableOpacity>
                  );
                }

                return (
                  <ThemedView key={index} style={{}}>
                    <ThemedText type="error">{message.message}</ThemedText>
                    <ThemedView
                      style={{ alignItems: "flex-start", paddingLeft: 2 }}
                    >
                      {Button}
                    </ThemedView>
                  </ThemedView>
                );
              } else {
                return null;
              }
            })}
          </>
        )}
        <ThemedButton title="Sign in" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <ThemedText>Don't have an account yet?</ThemedText>{" "}
          <ThemedText type="link">Sign up</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 210,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  loginScreenButton: {
    backgroundColor: "white",
    borderColor: "#fff",
  },
  resendText: {
    textAlign: "center",
    color: "#0a7ea4",
  },
});
