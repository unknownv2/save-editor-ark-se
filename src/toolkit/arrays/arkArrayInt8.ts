import { Byte } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayInt8 extends ArkArray<Byte> {

    public static TYPE = ArkName.constantPlain("Int8Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getByte());
        }
        Object.setPrototypeOf(this, ArkArrayInt8.prototype);
    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayInt8 {
        return new ArkArrayInt8(archive, property);
    }
    public getType(): ArkName {
        return ArkArrayInt8.TYPE;
    }
    public setValue(object: number): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putByte(element as number));
    }
    public calculateSize(): number {
        return BYTES.Integer + (this.length * BYTES.Byte);
    }
}