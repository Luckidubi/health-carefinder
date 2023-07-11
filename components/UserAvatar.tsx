"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFallbackLetter } from "@/lib/utils";
import { useSigninCheck } from "reactfire";

interface UserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className }: UserAvatarProps) => {
  const { data: signinResult } = useSigninCheck();
  const username = signinResult?.user?.displayName;
  const photoURL = signinResult?.user?.photoURL;
  const fallbackLetter = getFallbackLetter(username as string);

  return (
    <Avatar className={className}>
      <AvatarImage src={photoURL as string} alt="user picture" />
      <AvatarFallback>{fallbackLetter}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
