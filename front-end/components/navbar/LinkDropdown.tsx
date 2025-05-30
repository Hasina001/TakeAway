import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import { Button} from '../ui/button';
import Link from 'next/link';
import UserIcon from './UserIcon';
import { links } from '@/utils/links';

const LinkDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline' className='flex gap-4 max-w-[100px] border-none'>
          {/* <LuAlignLeft className='size-6'/> */}
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52' align='start' sideOffset={10}>
        {links.map((link) => {
          return <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='capitalize w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinkDropdown