
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

export class PropertyStruct extends PropertyBase<Struct> {

    public static TYPE: ArkName = ArkName.constantPlain('StructProperty');

    private structType: ArkName;

    constructor(archive: ArkArchive, name: ArkName) {
        super(archive, name);

        this.structType = archive.getName();

        //const position = archive.position;
        try {
            const struct = StructRegistry.readBinary(archive, this.structType);
            if(struct == null) {
                throw new Error("StructRegistry returned null");
            }
            this.value = struct;
        }
        catch {
            // read unknown
        }
    }
    
    public static create(archive: ArkArchive, name: ArkName): PropertyStruct {
        return new PropertyStruct(archive, name);
    }
    
    public getType(): ArkName {
        return PropertyStruct.TYPE;
    }
    
    public writeBinaryValue(archive: ArkArchive): void {
        archive.putName(this.structType);
        this.value.writeBinary(archive);
    }
    public getValue(): any {
        return this.value;
    }
    public calculateDataSize(nameSizer: NameSizeCalculator): number {
        return this.value.getSize(nameSizer);
    }

    public calculateAdditionalSize(nameSizer: NameSizeCalculator): number {
        return nameSizer.sizeOf(this.structType);
    }

    public collectNames(collector: NameCollector): void {
        super.collectNames(collector);
        collector.accept(this.structType);
        this.value.collectNames(collector);
    }

    public getStructType(): ArkName {
        return this.structType;
    }

    public setStructType(structType: ArkName): void {
        this.structType = structType;
    }
}