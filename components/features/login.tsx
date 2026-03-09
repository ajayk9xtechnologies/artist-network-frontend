 import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { loginWithPasswordAction } from "@/actions/index";
export const LoginForm = () => {
 
  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Logo / Brand */}
      <div className="text-center">
        <h2>Welcome Back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage your profile, hiring requests, and conversations.
        </p>
      </div>
 
      <form action={loginWithPasswordAction as unknown as (formData: FormData) => void} className="space-y-4" >
        <Input
          type="text" name="email"
          placeholder="Email address"
          label="Email address"
          className="h-12 bg-secondary border-border placeholder:text-muted-foreground" required={true}
        />
        <Input
          type="password" name="password"
          placeholder="Password"
          label="Password"
          className="h-12 bg-secondary border-border placeholder:text-muted-foreground"
          required={true}
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="w-full"
        >
          Sign In
        </Button>
      </form>
 
      <div className="flex justify-end">
        <button type="button" className="text-sm text-muted-foreground transition-colors hover:text-foreground" >
          Forgot password?
        </button>
      </div>
  
      <div className="space-y-3">
        <Button type="button" variant="google" size="sm" className="gap-2 w-full" >
           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>Continue with Google</span>
        </Button>

        {/* Facebook */}
        <Button
          type="button"
          variant="google"
          size="sm"
          className="gap-2 w-full"
        >
         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>Continue with Facebook</span>
        </Button>
      </div>

      {/* Sign up */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <span className="text-gradient-brand font-semibold cursor-pointer">
          Register now
        </span>
      </p>
    </div>
  );
};
