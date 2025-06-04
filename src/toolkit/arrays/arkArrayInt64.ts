import { Integer, Long } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayInt64 extends ArkArray<Long> {

    public static TYPE = ArkName.constantPlain("Int64Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getLong());
        }
        Object.setPrototypeOf(this, ArkArrayInt64.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayInt64 {
        return new ArkArrayInt64(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayInt64.TYPE;
    }

    public setValue(object: Long): void {
        
    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putLong(element));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Long);
    }
}