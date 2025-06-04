import { Short } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayUInt16 extends ArkArray<Short> {

    public static TYPE = ArkName.constantPlain("UInt16Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getUShort());
        }
        Object.setPrototypeOf(this, ArkArrayUInt16.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayUInt16 {
        return new ArkArrayUInt16(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayUInt16.TYPE;
    }

    public setValue(object: number): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putUShort(element as number));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Short);
    }
}