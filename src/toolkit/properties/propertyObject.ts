import { PropertyBase } from './propertyBase';
import { ObjectReference } from '../types/objectReference';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { BYTES } from '../typesizes';
import { NameSizeCalculator } from '../namesizecalculator';


export class PropertyObject extends PropertyBase<ObjectReference> {

    public static TYPE: ArkName = ArkName.constantPlain('ObjectProperty');

    constructor(archive: ArkArchive, name: ArkName) {
        super(archive, name);

        this.value = new ObjectReference(archive, this.dataSize);
    }
    
    public static create(archive: ArkArchive, name: ArkName): PropertyObject {
        return new PropertyObject(archive, name);
    }
    public getSize(): number {
        return 0;
    }
    public getType(): ArkName {
        return PropertyObject.TYPE;
    }
    public writeBinaryValue(archive: ArkArchive): void {
        this.value.writeBinary(archive);
    }
    public calculateDataSize(nameSizer: NameSizeCalculator): number {
        return this.value.getSize(nameSizer);
    }
}