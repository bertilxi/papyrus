import { Auth } from "https://esm.sh/@supabase/auth-ui-react@0.4.2?external=react";
import { ThemeSupa } from "https://esm.sh/@supabase/auth-ui-shared@0.1.6";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";
import { useEffect, useState } from "react";
import { Layout } from "./components/layout.tsx";

export const page = true;
export const interactive = true;

const supabase = createClient(
  "https://tukcyinopnvjtygnpdep.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1a2N5aW5vcG52anR5Z25wZGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNDgyOTksImV4cCI6MjAwNzkyNDI5OX0.95Z-XKwM-xo9HiubVLIpppf8MTSUckMXzYu4Fi7rk1I"
);

function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    return <div>Logged in!</div>;
  }

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      dark={true}
      magicLink={true}
      providers={[]}
    />
  );
}

export default function AuthPage() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <div className="container">
          <Login />
        </div>
      </div>
    </Layout>
  );
}
