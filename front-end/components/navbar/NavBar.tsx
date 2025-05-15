import React from 'react'
import Logo from './Logo'
import Menu from './Menu'
import LinkDropdown from './LinkDropdown'

const NavBar = () => {
    return (
        <nav>
            <div className='container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8'>
                <Logo />
                <div className='flex gap-4 items-center'>
                    <Menu />
                    <LinkDropdown />
                </div>
            </div>
        </nav>
    )
}

export default NavBar