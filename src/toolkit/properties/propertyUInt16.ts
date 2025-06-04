
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Short} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

export class PropertyUInt16 extends PropertyBase<Short> {

    public static TYPE: ArkName = ArkName.constantPlain('UInt16Property');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getUShort();
        }
        else {
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyUInt16 {
        return new PropertyUInt16(archive, name, index, value);
    }
    
    public getType(): ArkName {
        return PropertyUInt16.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putUShort(this.value as number);
    }
    public calculateDataSize(): number {
        return BYTES.Short;
    }
}