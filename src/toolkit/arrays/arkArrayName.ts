import { Integer } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayName extends ArkArray<ArkName> {

    public static TYPE = ArkName.constantPlain("NameProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getName());
        }
        Object.setPrototypeOf(this, ArkArrayName.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayName {
        return new ArkArrayName(archive, property);
    }    
    public getType(): ArkName {
        return ArkArrayName.TYPE;
    }
    public setValue(object: ArkName): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putName(element));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.reduce((a, p) => (a + nameSizer.sizeOf(p)), 0));
    }
}