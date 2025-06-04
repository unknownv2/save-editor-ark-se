import {PropertyBase} from './propertyBase';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Integer, Primitive} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { PropertyBinaryConstructor} from './propertyBinaryConstructor';
import { Struct } from '../structs/struct';
import { NameCollector } from '../namecollector';
import { StructRegistry } from '../structs/structRegistry';
import { ArkByteValue } from '../types/arkByteValue';

export class PropertyByte extends PropertyBase<ArkByteValue> {

    public static TYPE: ArkName = ArkName.constantPlain('ByteProperty');

    private enumType: ArkName;

    constructor(archive: ArkArchive, name: ArkName) {
        super(archive, name);

        this.enumType = archive.getName();

        this.value = new ArkByteValue(archive, !this.enumType.equals(ArkName.NAME_NONE));
    }
    
    public static create(archive: ArkArchive, name: ArkName): PropertyByte {
        return new PropertyByte(archive, name);
    }
    
    public getType(): ArkName {
        return PropertyByte.TYPE;
    }
    
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putName(this.enumType);
        this.value.writeBinary(archive);
    }

    public calculateDataSize(nameSizer: NameSizeCalculator): number {
        return this.value.getSize(nameSizer);
    }

    public calculateAdditionalSize(nameSizer: NameSizeCalculator): number {
        return nameSizer.sizeOf(this.enumType);
    }

    public collectNames(collector: NameCollector): void {
        super.collectNames(collector);
        collector.accept(this.enumType);
        this.value.collectNames(collector);
    }

    public get EnumType(): ArkName {
        return this.enumType;
    }

    public set EnumType(enumType: ArkName) {
        this.enumType = enumType;
    }
}