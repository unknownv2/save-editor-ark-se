
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Long} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { BigInteger } from 'big-integer';

export class PropertyInt64 extends PropertyBase<Long> {

    public static TYPE: ArkName = ArkName.constantPlain('Int64Property');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getLong();
        }
        else {
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyInt64 {
        return new PropertyInt64(archive, name, index, value);
    }
    
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putLong(this.value);
    }

    public getType(): ArkName {
        return PropertyInt64.TYPE;
    }

    public calculateDataSize(): number {
        return BYTES.Long;
    }
}