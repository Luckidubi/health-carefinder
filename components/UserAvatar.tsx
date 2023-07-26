"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks";
import { getFallbackLetter } from "@/lib/utils";
import { useSigninCheck } from "reactfire";

interface UserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className }: UserAvatarProps) => {

  const { data: signinResult } = useSigninCheck();
  const id = signinResult?.user?.uid;
   const {user }: any  = useUser(id || "");
   const name =user?.username || "";
   const photo = user?.photo || "";
    const fallbackLetter = getFallbackLetter(name );

  return (
    <Avatar className={className}>
      <AvatarImage src={photo} alt="user picture" />
      <AvatarFallback>{fallbackLetter}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
