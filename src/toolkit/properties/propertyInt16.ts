
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Short} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

export class PropertyInt16 extends PropertyBase<Short> {

    public static TYPE: ArkName = ArkName.constantPlain('Int64Property');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getShort();
        }
        else {
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyInt16 {
        return new PropertyInt16(archive, name, index, value);
    }
    
    public getType(): ArkName {
        return PropertyInt16.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putShort(this.value as number);
    }
    public calculateDataSize(): number {
        return BYTES.Short;
    }
}