interface IArkName extends String {
    string: string;
}

export class ArkName {

    private string: string;
   // private padStart: number;
   // private padEnd: number;
    
    private instance: number;
    private name: string;
    public static nameCache: HashMap[] = [];
    
    public static NAME_NONE: ArkName = ArkName.constantPlain("None");

    private constructor(name?:string, instance?: number, string?: string) {

       // debugger;
        //super(name || string || '');

        this.string = name || string || '';

        this.name = name || string || '';
        this.instance = instance || 0;
    }
    public static from(name: string): ArkName {
        //debugger;
        const arkName = new ArkName(name);
        this.addToCache(name, arkName);
        return arkName;
    }

    public getName(): string {
        return this.name;
    }
    public getInstance(): number {
        return this.instance;
    }
    public toString(): string {
        return this.string;
        
    }
    public hashCode(): number {
        var hash = 0, i, chr;
        if (this.string.length === 0) return hash;

        for (i = 0; i < this.string.length; i++) {
          chr   = this.string.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0;
        }
        return hash;
    }
    public equals(obj: any): boolean {
        if(this === obj)
            return true;
        if((!(obj as ArkName))) {
            return false;
        }
        return this.string === (obj as ArkName).toString();
    }
    public compareTo(o: ArkName): number {
        return this.string.localeCompare(o.toString());
    }

    public subSequence(start: number, end: number): string {
        return this.string.substring(start, end);
    }
    public static constantPlain(name: string): ArkName {
        const arkName = ArkName.from(name);
        this.addToCache(name, arkName);
        return arkName;
    }
    private static addToCache(name: string, arkName: ArkName): void {
        if(!this.nameCache[name]) {
            this.nameCache[name] = arkName;
        }
    }
}
interface HashMap {
    [name:string]: ArkName;
}