"use client"

import {JSX} from "react";
import {useState} from "react";
import {useEffect} from "react";

export function UserAccount(): JSX.Element {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleWindowClick = (event: any) => {
            const target = event.target.closest('button');
            if (target && target.id === "user-menu-button-id") {
                return;
            }
            setIsOpen(false);
        }
        window.addEventListener('click', handleWindowClick)
        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
    }, []);

    return (
        <div className={"overflow-visible"}>
            <button type="button"
                    onClick={() => {setIsOpen(!isOpen)}}
                    className="flex text-sm w-8 h-8 ml-1 rtl:mr-1 bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button-id"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="/images/profile-picture-3.jpg" alt="user photo"/>
            </button>
            {isOpen &&
                <div
                    className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown">
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
            }
            </div>
    )

}