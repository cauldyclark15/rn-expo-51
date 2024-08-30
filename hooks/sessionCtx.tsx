import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorage";
import { useRouter } from "expo-router";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [[sessionIsLoading, session], setSession] = useStorageState("session");

  async function signIn() {
    setSession("xxx");
    router.replace("/(app)");
  }

  function signOut() {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading: sessionIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
