"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HospitalProps } from "@/models/Hospital";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//  name: string;
//  address: string;
//  phone: string;
//  email: string;
//  state: string;
//  postalcode: string;
//  photo: string;
//  city: string;
//  country: string;
//  latitude: string;
//  longitude: string;
//  place_id: string;
//  road: string;
//  content: string;

export const columns: ColumnDef<HospitalProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "state",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "postalcode",
    header: "Postcode",
  },
  {
    accessorKey: "photo",
    header: "Photo",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "place_id",
    header: "Place ID",
  },
  {
    accessorKey: "road",
    header: "Road",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const hospital = row.original;

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
              onClick={() => navigator.clipboard.writeText(hospital.place_id)}
            >
              Copy hospital ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View hospital</DropdownMenuItem>
            <DropdownMenuItem>Edit hospital</DropdownMenuItem>
            <DropdownMenuItem> Delete hospital</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
