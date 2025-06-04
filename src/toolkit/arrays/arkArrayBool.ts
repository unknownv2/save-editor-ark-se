import { Byte, Bool } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayBool extends ArkArray<Bool> {

    public static TYPE = ArkName.constantPlain("BoolProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getByte() !== 0);
        }
        Object.setPrototypeOf(this, ArkArrayBool.prototype);
    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayBool {
        return new ArkArrayBool(archive, property);
    }
    public getType(): ArkName {
        return ArkArrayBool.TYPE;
    }
    public setValue(object: any): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putByte((element.valueOf() ? 1 : 0)));
    }
    public calculateSize(): number {
        return BYTES.Integer + (this.length * BYTES.Byte);
    }
}