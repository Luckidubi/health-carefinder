"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProps } from "@/models/Users";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import Link from "next/link";
import { mutate } from "swr";

const handleDeleteUser = async (user: UserProps) => {

  const hasConfirmed = confirm(
    "Are you sure you want to delete this hospital?"
  );

  if (hasConfirmed) {
    try {
      const res = await fetch(`/api/users/${user.userId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert("User deleted successfully");
       
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    }
  }
};

export const columns: ColumnDef<UserProps>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "photo",
    header: "Photo",
  },

  {
    accessorKey: "userId",
    header: "User ID",
  },

  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.userId)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/admin/edit-user/${user.userId}`}>Edit user</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteUser(user)}>
              {" "}
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
