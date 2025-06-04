
import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Integer, Primitive} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { PropertyBinaryConstructor} from './propertyBinaryConstructor';
import { Struct } from '../structs/struct';
import { NameCollector } from '../namecollector';
import { ArkArray } from '../../toolkit/arrays/arkArray';
import { ArkArrayRegistry } from '../../toolkit/arrays/arkArrayRegistry';
import { ArkArrayStruct } from '../../toolkit/arrays/arkArrayStruct';
import { ArkArrayObjectReference } from '../../toolkit/arrays/arkArrayObjectReference';

export class PropertyArray extends PropertyBase<ArkArray<any>> {

    public static TYPE: ArkName = ArkName.constantPlain('ArrayProperty');

    constructor(archive: ArkArchive, name: ArkName) {
        super(archive, name);

        const arrayType = archive.getName();

        const position = archive.position;
        try {
            const array = ArkArrayRegistry.readBinary(archive, arrayType, this);
            if(array == null) {
                throw new Error("ArkArrayRegistry returned null");
            }
            this.value = array;
        }
        catch {
            // read unknown
        }
    }
    
    public static create(archive: ArkArchive, name: ArkName): PropertyArray {
        return new PropertyArray(archive, name);
    }
    
    public getType(): ArkName {
        return PropertyArray.TYPE;
    }
    
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putName(this.value.getType());
        this.value.writeBinary(archive);
    }

    public calculateDataSize(nameSizer: NameSizeCalculator): number {
        return this.value.calculateSize(nameSizer);
    }

    public calculateAdditionalSize(nameSizer: NameSizeCalculator): number {
        return nameSizer.sizeOf(this.value.getType());
    }

    public collectNames(collector: NameCollector): void {
        super.collectNames(collector);
        collector.accept(this.value.getType());
        this.collectNames(collector);
    }
    public isDataSizeNeeded(): boolean{
        return this.value instanceof ArkArrayStruct;
    }
}