
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Long} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

export class PropertyStr extends PropertyBase<string> {

    public static TYPE: ArkName = ArkName.constantPlain('StrProperty');
    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getString();
        }
        else{
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyStr {
        return new PropertyStr(archive, name, index, value);
    }
    
    public getType(): ArkName {
        return PropertyStr.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putString(this.value);
    }
    public calculateDataSize(): number {
        return ArkArchive.getStringLength(this.value);
    }
}