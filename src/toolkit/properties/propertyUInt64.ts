
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Long} from '../basetypes';
import {PropertyInt64} from './propertyInt64'

import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { BigInteger } from 'big-integer';

export class PropertyUInt64 extends PropertyBase<Long> {

    public static TYPE: ArkName = ArkName.constantPlain('UInt64Property');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getULong();
        }
        else {
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyUInt64 {
        return new PropertyUInt64(archive, name, index, value);
    }

    public writeBinaryValue(archive: ArkArchive): void {
        archive.putULong(this.value);
    }

    public getType(): ArkName {
        return PropertyUInt64.TYPE;
    }
    public calculateDataSize(): number {
        return BYTES.Long;
    }
}