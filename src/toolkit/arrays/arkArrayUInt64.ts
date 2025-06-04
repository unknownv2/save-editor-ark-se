import { Integer, Long } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayUInt64 extends ArkArray<Long> {

    public static TYPE = ArkName.constantPlain("UInt64Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getULong());
        }
        Object.setPrototypeOf(this, ArkArrayUInt64.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayUInt64 {
        return new ArkArrayUInt64(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayUInt64.TYPE;
    }

    public setValue(object: Long): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putULong(element));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Long);
    }
}