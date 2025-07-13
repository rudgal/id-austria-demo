'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { ButtonIdaAuthentication } from '@/components/button-ida-authentication';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: "Not implemented",
      description: "This is only for illustration purposes.",
    });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <div className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full" onClick={handleNotImplemented}>Log In</Button>
      </div>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500 dark:bg-slate-950 dark:text-gray-400">
          Or login with
        </span>
      </div>
      <div className="space-y-2">
        <Button variant="outline" className="w-full" onClick={handleNotImplemented}>
          <FcGoogle />
          Google
        </Button>
        <Button variant="outline" className="w-full" onClick={handleNotImplemented}>
          <FaApple />
          Apple
        </Button>
        <ButtonIdaAuthentication variant="outline" className="w-full" />
      </div>
    </div>
  );
}
