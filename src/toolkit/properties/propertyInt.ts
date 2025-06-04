
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Integer, Primitive} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { PropertyBinaryConstructor} from './propertybinaryconstructor';
import { Property } from './property';

export class PropertyInt extends PropertyBase<Integer> {

    public static TYPE: ArkName = ArkName.constantPlain('IntProperty');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getInt();
        }
        else{
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyInt {
        return new PropertyInt(archive, name, index, value);
    }
    
    public getType(): ArkName {
        return PropertyInt.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putInt(this.value as number);
    }
    public calculateDataSize(nameSize?: NameSizeCalculator): number {
        return BYTES.Integer;
    }
}