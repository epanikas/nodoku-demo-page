"use client"

import React, {JSX, useEffect, useState} from "react";
// import styles from "./language-selector.module.scss";
import {LANGUAGE_COOKIE} from "@/app/components/common-i18n-config";

// interface FlagIconProps {
//     countryCode: string;
//     className: string;
// }

// function FlagIcon(props: FlagIconProps): JSX.Element {
//
//     const {countryCode, className} = props;
//     // return (
//     //     <span
//     //         className={`fi fis ${styles.fiCircle} inline-block fi-${countryCode} ${className}`}
//     //     />
//     // );
//     return flagIconProvider(countryCode, "1x1", "fi fis fiCircle inline-block")
// }

const LANGUAGE_SELECTOR_ID = 'language-selector';

console.log("adding language switcher...")

export const LanguageSwitcher = (
    {languages, selectedLng}: {
        selectedLng: string,
        languages: {
            key: string;
            name: string;
            isDefault: boolean;
            icon: JSX.Element | undefined
        }[]
    }): JSX.Element => {

    const [isOpen, setIsOpen] = useState(false);

    const selectedLanguage = languages.find(language => language.key === selectedLng);
    console.log("using useState...", isOpen)

    const handleLanguageChange = async (lng: string) => {

        const urlPath = window.location.pathname;

        const langsPattern = languages.map(l => l.key).join("|") ;
        console.log("client langsPattern", langsPattern, urlPath)
        const regex = new RegExp(`^\/(${langsPattern})\/?(.*)`);

        const chunkedUrl = regex.exec(urlPath);
        console.log("chunkedUrl", chunkedUrl)

        if (chunkedUrl) {
            const restOfUrl = chunkedUrl[2]
            document.cookie = `${LANGUAGE_COOKIE}=${lng}; path=/`;
            window.location.assign(`/${lng}${restOfUrl}`)
        } else {
            document.cookie = `${LANGUAGE_COOKIE}=${lng}; path=/`;
            window.location.reload();
        }

    };

    useEffect(() => {
        const handleWindowClick = (event: any) => {
            const target = event.target.closest('button');
            if (target && target.id === LANGUAGE_SELECTOR_ID) {
                return;
            }
            setIsOpen(false);
        }
        window.addEventListener('click', handleWindowClick)
        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
    }, []);

    if (!selectedLanguage) {
        return <div>no selected language</div>;
    }

    return (
        <>
            <div className="flex items-center z-40 mr-2 z-100">
                <div className="relative inline-block text-left">
                    <div>
                        <button
                            onClick={() => {setIsOpen(!isOpen)}}
                            type="button"
                            className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-1 py-1 bg-white dark:bg-black text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            id={LANGUAGE_SELECTOR_ID}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            {/*<FlagIcon countryCode={selectedLanguage.icon} className={""}/>*/}
                            {selectedLanguage.icon}
                        </button>
                    </div>
                    {isOpen && <div
                        className="origin-top-right w-36 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-black dark:text-white"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="language-selector"
                    >
                        <div className="py-1 grid grid-cols-1 gap-2" role="none">
                            {languages.map((language, index) => {
                                return (
                                    <button
                                        key={language.key}
                                        onClick={() => handleLanguageChange(language.key)}
                                        className={`${
                                            selectedLanguage.key === language.key
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                                : "text-gray-700"
                                        } px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 hover:dark:bg-gray-800 rounded`}
                                        role="menuitem"
                                    >
                                        {/*<FlagIcon countryCode={language.icon} className={"mr-2"}/>*/}
                                        <span className={"mr-2 rtl:ml-2"}>{language.icon}</span>
                                        <span className="truncate text-black dark:text-white">{language.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
};
