import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

const Navbar = () => {
    const [toggleMenu, setToggleState] = useState(false);
    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <h1 className='text-white text-2xl animate-pulse'>CRYPTransfer</h1>
                <h4 className='text-white font-semibold text-sm animate-pulse' >(Based on Web 3.0)</h4>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between 
            flex-initial'>
                <a href='' className='mx-5 text-sm text-white'>Why CRYPTransfer ?</a>
                <a href='' className='mx-5 text-sm text-white'>{"Help & Support"}</a>
                <a href='' className='mx-5 text-sm text-white'>About Us</a>
            </ul>
            <div className='flex relative'>
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer'
                        onClick={() => setToggleState(false)} />
                    : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer'
                        onClick={() => setToggleState(true)} />          
                }
                {toggleMenu && (
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden
                            list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose className='text-white' onClick={()=>setToggleState(false)}/>
                            <ul className='my-5'><a href='' className='text-sm text-white'>Why CRYPTransfer ?</a>                           </ul>
                            <ul className='my-5'><a href='' className='text-sm text-white'>{"Help & Support"}</a></ul>
                            <ul className='my-5'><a href='' className='text-sm text-white'>About Us</a></ul>                            
                        </li>
                        
                    </ul>
                )
                }
            </div>
        </nav>
    );
}

export default Navbar;