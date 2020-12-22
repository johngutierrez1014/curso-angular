export class DestinoViaje {
  setselected(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
    private selected: boolean;
    public servicios: string[];
  forEach: any;
    constructor(public nombre: string, public u: string) { 
        this.servicios=['pilita','desayuno'];
    }
    isSelected(): Boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
}