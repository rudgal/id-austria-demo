'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

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
          <FcGoogle />
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <FaApple />
          Apple
        </Button>
        <Button variant="outline" className="w-full">
          Custom Federated Login
        </Button>
      </div>
    </div>
  );
}
