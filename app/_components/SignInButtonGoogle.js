"use client"

import Image from "next/image"
import { createClient } from '@/app/_lib/supabase/client';
import { useSearchParams } from "next/navigation";

function SignInButtonGoogle() {
  const supabase = createClient();
  const sp = useSearchParams();

  async function signInGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${sp.get("next") || "/"}`
      },
    })

    
  }
  
  return (
        <button 
          onClick={signInGoogle}
          className="signbutton flex justify-center gap-3 w-[250px]"
        >
          <Image
            src='https://authjs.dev/img/providers/google.svg'
            alt="Google Logo"
            height="15"
            width="15"
            className="border-black rounded-full"
          />

          <span>Continue with Google</span>
        </button>
  )
}

export default SignInButtonGoogle
