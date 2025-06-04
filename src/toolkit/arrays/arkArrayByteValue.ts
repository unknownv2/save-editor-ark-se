import { Integer, Long } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { ArkByteValue } from '../types/arkByteValue';
import { ArkArrayByteHandler } from './arkArrayByteHandler';
import { BYTES } from '../typesizes';

export class ArkArrayByteValue extends ArkArray<ArkByteValue> {
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(new ArkByteValue(null, null, archive.getName()));
        }
        Object.setPrototypeOf(this, ArkArrayByteValue.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayByteValue {
        return new ArkArrayByteValue(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayByteHandler.TYPE;
    }

    public setValue(object: any): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putName(element.NameValue));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.reduce((a, p) => (a + nameSizer.sizeOf(p.NameValue)), 0));
    }
}