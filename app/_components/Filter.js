'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams(); 
  const pathName = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get('capacity') ?? 'all'

  function handleClick (capacity) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', capacity)
    router.replace(`${pathName}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className='flex border border-primary-700'>
      <button className='px-5 py-2' onClick={() => handleClick('all')} >All</button>
      <button className='px-5 py-2' onClick={() => handleClick('small')}>Small</button>
      <button className='px-5 py-2' onClick={() => handleClick('medium')}>Medium</button>
      <button className='px-5 py-2' onClick={() => handleClick('large')}>Large</button>
    </div>
  )
}
