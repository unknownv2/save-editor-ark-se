import { Integer } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayInt16 extends ArkArray<Integer> {

    public static TYPE = ArkName.constantPlain("Int16Property");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getShort());
        }
        Object.setPrototypeOf(this, ArkArrayInt16.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayInt16 {
        return new ArkArrayInt16(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayInt16.TYPE;
    }

    public setValue(object: number): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putShort(element as number));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Short);
    }
}