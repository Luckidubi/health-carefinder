'use client'
import { UserProps } from "@/models/Users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetUsers } from "@/hooks";



export function RecentUsers() {

const {users, isLoading}: any = useGetUsers();


  return (
    <div className="space-y-8">

        {!isLoading &&
          users.length > 0 &&
          users.map((user: UserProps) => (
            <div className="flex items-center" key={user.userId}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photo} alt="Avatar" />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <div className="ml-auto font-medium">{user.role}</div>
            </div>
          ))}


    </div>
  );
}
