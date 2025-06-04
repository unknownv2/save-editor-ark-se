import { Integer } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayUInt32 extends ArkArray<Integer> {

    public static TYPE = ArkName.constantPlain("UInt32Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getUInt());
        }
        Object.setPrototypeOf(this, ArkArrayUInt32.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayUInt32 {
        return new ArkArrayUInt32(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayUInt32.TYPE;
    }

    public setValue(object: number): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putUInt(element as number));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Integer);
    }
}