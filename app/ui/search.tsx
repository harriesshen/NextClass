'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
// import { useRouter } from 'next/router';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParam = useSearchParams(); // 
  const pathname = usePathname(); // 當下路徑
  const { replace } = useRouter() // 替換路徑

  const handleSearch = useDebouncedCallback((term:string) =>{
    console.log('term',term);
    const param = new URLSearchParams(searchParam);
    param.set('page','1')
    if(term) param.set('query',term);
    if(!term) param.delete('query');
    replace(`${pathname}?${param.toString()}`)
  },300)
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={e=>handleSearch(e.target.value)}
        defaultValue={searchParam.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
