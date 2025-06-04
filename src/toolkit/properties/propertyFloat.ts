
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Float} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

export class PropertyFloat extends PropertyBase<Float> {

    public static TYPE: ArkName = ArkName.constantPlain('FloatProperty');

    constructor(archive: ArkArchive, name: ArkName, index?: number, value?: any) {
        super(archive, name, index, value);
        if(!value) {
            this.value = archive.getFloat();
        }
        else{
            this.dataSize = this.calculateDataSize();
        }
    }
    
    public static create(archive?: ArkArchive, name?: ArkName, index?: number, value?: number): PropertyFloat {
        return new PropertyFloat(archive, name, index, value);
    }
    
    public getType(): ArkName {
        return PropertyFloat.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putFloat(this.value as number);
    }
    public calculateAdditionalSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Boolean;
    }
    public calculateDataSize(): number {
        return BYTES.Float;
    }
}