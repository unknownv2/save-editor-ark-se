
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Long} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

export class PropertyBool extends PropertyBase<boolean> {

    public static TYPE: ArkName = ArkName.constantPlain('BoolProperty');

    constructor(archive: ArkArchive, name: ArkName) {
        super(archive, name);

        this.value = archive.getByte() !== 0;
    }
    
    public static create(archive: ArkArchive, name: ArkName): PropertyBool {
        return new PropertyBool(archive, name);
    }
    
    public getType(): ArkName {
        return PropertyBool.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putBoolean(this.value);
    }
    public calculateAdditionalSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Boolean;
    }
    public calculateDataSize(): number {
        return BYTES.Boolean;
    }
}