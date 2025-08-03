import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 flex justify-around items-center text-white py-5'>
        <div className="logo font-bold">
            <h1>Password Manager Co</h1>
        </div>
        <ul className='flex items-center gap-4.5'>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/">Contact</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
