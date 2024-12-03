'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function LoginForm() {
  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-center text-2xl font-bold">Login Demo</h2>
      <form className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Log In</Button>
      </form>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
          Or login with
        </span>
      </div>
      <div className="space-y-2">
        <Button variant="outline" className="w-full">
          <svg className="mr-2 h-5 w-5" viewBox="0 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 7.7 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <svg className="mr-2 h-5 w-5" viewBox="0 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.5-2.06-.48-3.2 0-1.42.61-2.17.53-3.08-.38C3.33 16.08 4.61 8.29 9.49 8c1.21.05 2.06.54 2.79.55.73.01 1.65-.43 3.01-.51 1.86-.09 3.18.74 3.96 1.86-3.54 2.32-2.96 6.67.8 7.93-.65 1.55-1.51 3.09-3 4.45zm-3.43-17.44c-2.02.33-3.82 2.23-3.78 4.09 1.89.11 3.79-1.93 3.78-4.09z"
              fill="#000000"
            />
          </svg>
          Apple
        </Button>
        <Button variant="outline" className="w-full">
          Custom Federated Login
        </Button>
      </div>
    </div>
  );
}
