import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';

export class ArkArrayString extends ArkArray<string> {

    public static TYPE = ArkName.constantPlain("StrProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getString());
        }
        Object.setPrototypeOf(this, ArkArrayString.prototype);
    }
    
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayString {
        return new ArkArrayString(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayString.TYPE;
    }

    public setValue(object: string): void {
   
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putString(element));
    }

    public calculateSize(nameSizer: NameSizeCalculator): number {
        return this.reduce((a, p) => (a + ArkArchive.getStringLength(p)), 0);
    }
}