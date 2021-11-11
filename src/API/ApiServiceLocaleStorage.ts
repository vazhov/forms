export default class ApiServiceLocaleStorage {
    static get(field: string) {
        return localStorage.getItem(field);
    }
    static save(field: string, value: any) {
        return localStorage.setItem(field, value);
    }
    static deleteItem(field: string, itemId: number) : void {
        const listItems = localStorage.getItem(field);
        const listItemsArray = listItems && JSON.parse(listItems);
        const newArray = listItemsArray.filter((item: any) => item.id !== itemId);
        this.save(field, JSON.stringify(newArray));
    }
    static delete(field: string) : void {
        localStorage.removeItem(field)
    }
    static clearAll() : void {
        localStorage.clear()
    }
}