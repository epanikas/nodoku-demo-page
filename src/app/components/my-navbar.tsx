
import {
    Avatar,
    DarkThemeToggle,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle
} from "flowbite-react";
import React from "react";
import {HiOutlineMap} from "react-icons/hi2";
import "flag-icons/css/flag-icons.css";
import {LanguageSwitcher} from "@/app/components/language-switcher";

export class NavbarMenuItem {
    label: string;
    link: string;
    subItems: NavbarMenuItem[] = [];

    constructor(label: string, link: string) {
        this.label = label;
        this.link = link;
    }

}

export class NavbarProps {
    languages: { key: string;
        name: string;
        isDefault: boolean;
        icon: string }[] = [];
    selectedLng: string = "en";
    menu: NavbarMenuItem[] = [];
}

export default function MyNavbar(props: NavbarProps) {

    // console.log("this is my props" ,props)

    const languages = props?.languages ? props?.languages : [{key: "en", name: "en", isDefault: true, icon: "gb"}];
    const selectedLng = props?.selectedLng ? props.selectedLng : "en";
    const {menu} = props;

    return (

        <Navbar fluid rounded className={"bg-gray-100 fixed top-0 left-0 right-0 z-40"}>
            <NavbarBrand href="https://flowbite-react.com">
                <HiOutlineMap size={40} className={"dark:text-white"}/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Nodoku</span>
            </NavbarBrand>

            <div className="flex md:order-last">
                <DarkThemeToggle className={"mr-2"}/>
                <LanguageSwitcher selectedLng={selectedLng} languages={languages}/>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded/>
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle/>
            </div>
            <NavbarCollapse>
                {
                    menu.map((mi, i) => {
                        if (mi.subItems && mi.subItems.length > 0) {
                            return (
                                <li key={`list-i-${i}`} className={"block py-2 pl-3 pr-4 md:p-0"}>
                                    <Dropdown label={mi.label} arrowIcon={true} inline>
                                        {mi.subItems.map((si, k) => {
                                            return <DropdownItem key={`list-i-${i}-k-${k}`} href={si.link}>{si.label}</DropdownItem>
                                        })}
                                    </Dropdown>
                                </li>
                            )
                        } else {
                            return <NavbarLink key={`navbarlink-${i}`} href={mi.link} active>{mi.label}</NavbarLink>
                        }
                    })
                }
            </NavbarCollapse>

        </Navbar>

    );

}