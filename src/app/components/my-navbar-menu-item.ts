export class NavbarMenuItem {
    label: string;
    link: string;
    subItems: NavbarMenuItem[] = [];

    constructor(label: string, link: string) {
        this.label = label;
        this.link = link;
    }

}

