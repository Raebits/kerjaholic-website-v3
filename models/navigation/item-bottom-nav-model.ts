export class ItemBottomNavModel {

    public id: number;   
    public icon: string;
    public label: string;
    public route: string;

    constructor(icon: string, label: string, route: string) {
        this.id = Math.random() * 100
        this.icon = icon
        this.label = label
        this.route = route
    }
}