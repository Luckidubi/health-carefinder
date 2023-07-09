import { HospitalCardProps } from '@/types';
import {  Share2Icon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';

const LibraryCard = ({photo, address, name}:HospitalCardProps) => {
  return (
    <div className='py-4'>
      <div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-6 lg:col-span-9 bg-gray-200 max-w-[1004px] min-h-[64px] max-h-[97px] rounded-2xl overflow-hidden">
          <div className="flex items-center py-2 px-2 md:gap-8">
            <Image
              src={photo}
              alt="hospital image"
              width={50}
              height={50}
              className="object-contain rounded-full h-full md:w-16"
            />
            <div className="flex flex-col ml-4 pr-4">
              <p className="text-start text-black text-[12px] md:text-[18px] font-bold leading-4 md:leading-8">
            {name}
              </p>
              <p className="text-start text-black text-[10px] md:text-[14px] font-bold leading-tight">
               {address}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-3 bg-gray-200  min-h-[64px] max-h-[97px] rounded-2xl mmax-w-[328px]">
          <div className="flex flex-center py-4 px-2 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-900 text-white hover:text-blue-900 hover:bg-neutral-100 "
              title='Share'
            >
              <Share2Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-red-900 text-white hover:text-red-900 hover:bg-neutral-100 "
              title='Delete'
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryCard