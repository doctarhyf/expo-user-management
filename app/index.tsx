import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Account from "../components/Account";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
