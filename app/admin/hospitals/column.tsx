"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HospitalProps } from "@/models/Hospital";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";

const handleDeleteHospital = async (hospital: HospitalProps) => {

  const hasConfirmed = confirm(
    "Are you sure you want to delete this hospital?"
  );

  if (hasConfirmed) {
    try {
      const res = await fetch(`/api/hospitals/${hospital.place_id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert("Hospital deleted successfully");
        mutate('/api/hospitals')
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete Hospital");
    }
  }
};

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
            <DropdownMenuItem>
              <Link href={`/find-hospital/${hospital.place_id}`}>View hospital</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/edit-hospital/${hospital.place_id}`}>
                Edit hospital
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteHospital(hospital)}> Delete hospital</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
