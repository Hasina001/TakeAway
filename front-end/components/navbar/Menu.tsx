import Link from 'next/link'
import React from 'react'

const style = "relative inline-block font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-400 after:ease-in-out hover:after:w-full"

const Menu = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-4'>
            <Link
                href='/'
                className={style}
            >
                Home
            </Link>
            <Link
                href='/bookings'
                className={style}
            >
                Bookings
            </Link>
            <Link
                href='/favorites'
                className={style}
            >
                Favorites
            </Link>
            <Link
                href='/categories'
                className={style}
            >
                Categories
            </Link>
        </div>
    )
}

export default Menu
