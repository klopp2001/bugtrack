import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'

interface SideBarLinkProps {
    hrefValue: string
    icon: any
    children : React.ReactNode
}
//TODO:: make images
const SideBarLink = ({hrefValue, icon,  children} : SideBarLinkProps) => {
  return (
    <div className='flex flex-row gap-2 items-center border-2 border-transparent px-2 hover:border-l-green-800 hover:bg-gray-100 hover:border-solid hover:border-l-2'>
       {icon}
        <Link className='block ' href={hrefValue}>{children}</Link> 
    </div>
  )
}

export default SideBarLink