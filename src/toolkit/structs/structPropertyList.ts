import { StructBase } from './structBase';
import { PropertyContainer } from '../propertyContainer';
import { ArkArchive } from '../arkArchive';
import { NameCollector } from '../namecollector';
import { NameSizeCalculator } from '../namesizecalculator';
import { ArkName } from '../arkName';
import { Property } from '../properties/property';
import { PropertyRegistry } from '../properties/propertyRegistry';

export class StructPropertyList extends PropertyContainer implements StructBase {

    private properties: Property<any>[];

    constructor(archive: ArkArchive) {
        super();

        this.properties = [];
        let property = PropertyRegistry.readBinary(archive);

        while(property != null) {
            this.properties.push(property);
            property = PropertyRegistry.readBinary(archive);
        }
    }

    public static create(archive: ArkArchive): StructBase {
        return new StructPropertyList(archive);
    }

    public getProperties(): Property<any>[] {
        return this.properties;
    }
    public addProperty(property: any) {
        this.properties.push(PropertyRegistry.createFrom(property.type, property.name, property.index, 
            property.value));
    }
    public writeBinary(archive: ArkArchive): void {
        this.properties.forEach(p => p.writeBinary(archive));

        archive.putName(ArkName.NAME_NONE);
    }

    public isNative(): boolean {
        return false;
    }

    public collectNames(collector: NameCollector): void {

    }
    public getValue(): any {
        return this.properties;
    }
    public getSize(nameSizer: NameSizeCalculator): number {
        let size = nameSizer.sizeOf(ArkName.NAME_NONE);

        size += this.properties.reduce( (a, p) => (a + p.calculateSize(nameSizer)), 0);

        return size;
    }
}