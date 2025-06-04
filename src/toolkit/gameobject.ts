import { Stream } from 'libvantage';
import { readString, writeString } from '../util';
import { ArkArchive} from './arkArchive';
import { ArkName } from './arkName';
import { LocationData} from './types/locationData';
import { PropertyRegistry } from './properties/propertyRegistry';
import { Property } from './properties/property';
import { NameSizeCalculator } from './namesizecalculator';
import { ExtraDataRegistry } from './data/extraDataRegistry';
import { ExtraData } from './data/extraData';
import { BYTES } from './typesizes';
import { PropertyContainer } from './propertyContainer';

export class GameObject extends PropertyContainer {

    private uuid: Buffer;
    private className: ArkName;
    private isItem: boolean;
    private names: ArkName[];
    private isFromDataFile: boolean;
    private propertiesOffset: number;
    private dataFileIndex: number;
    private properties: Property<any>[];

    private extraData: ExtraData;
    private locationData: LocationData;

    constructor(archive: ArkArchive) {
        
        super();
        this.init();
        this.readBinary(archive);
    }
    private init(): void {
        this.names = [];
    }
    private readBinary(archive: ArkArchive) {

        this.uuid = archive.getUuid();

        this.className = archive.getName();

        this.isItem = archive.getBoolean();

        const nameCount = archive.getInt();
        for(let x = 0; x < nameCount; x++) {
            this.names.push(archive.getName());
        }

        this.isFromDataFile = archive.getBoolean();

        this.dataFileIndex =  archive.getInt();
        
        const hasLocationData = archive.getBoolean();

        if(hasLocationData) {
            this.locationData = new LocationData(archive);
        }

        this.propertiesOffset = archive.getInt();
        if(archive.getInt() !== 0) {
            throw new Error('Expected a zero value at the end of the GameObject');
        }
    }

    public loadProperties(archive: ArkArchive, nextObject: GameObject, offset: number): void {

        archive.position = (this.propertiesOffset + offset);
        let position = offset;
        let nextOffset = (nextObject != null) ? this.propertiesOffset + nextObject.propertiesOffset : archive.limit();
        this.properties = [];

        try {
            let property = PropertyRegistry.readBinary(archive);

            while(property != null) {
                position = archive.position;
                this.properties.push(property);
                property = PropertyRegistry.readBinary(archive);
            }
        }
        catch {
            console.log("Failed parsing at position: "+ position);
        }

        const distance = nextOffset - archive.position;
        
        if(distance > 0) {
            this.extraData = ExtraDataRegistry.getExtraData(this, archive, distance);
        }
    }
    public getProperties(): Property<any>[] {
        return this.properties;
    }
    public addProperty(property: any) {
        this.properties.push(PropertyRegistry.createFrom(property.type, property.name, property.index, 
            property.value));
    }
    public writeBinary(archive: ArkArchive, offset: number): number {

        if(this.uuid !== null) {
            archive.putBytes(this.uuid);
        }

        archive.putName(this.className);
        archive.putInt(this.isItem ? 1 : 0);
        if(this.names !== null) {
            archive.putInt(this.names.length);
            this.names.forEach( n => archive.putName(n));
        }
        else {
            archive.putInt(0);
        }

        archive.putInt(this.isFromDataFile? 1 : 0);
        archive.putInt(this.dataFileIndex);

        if(this.locationData) {
            archive.putInt(1);
            archive.putBytes(this.locationData.toBuffer());
        }
        else {
            archive.putInt(0); // false
        }

        this.propertiesOffset = offset;
        archive.putInt(this.propertiesOffset);
        archive.putInt(0);

        return this.propertiesOffset + offset;
    }

    public writeProperties(archive: ArkArchive, offset: number): number {
        archive.position = this.propertiesOffset + offset;

        if(this.properties != null) {
            this.properties.forEach(p => p.writeBinary(archive));
        }

        archive.putName(ArkName.NAME_NONE);

        if(this.extraData != null) {
            this.extraData.writeBinary(archive);
        }
        else {
            throw new Error("unsupported object with invalid ExtraData");
        }
        return 0;
    }

    public getSize(nameSizer: NameSizeCalculator): number {
        let size = 16 + BYTES.Integer * 7;
        size += nameSizer.sizeOf(this.className);
        if(this.names) {
            size += this.names.map(n => nameSizer.sizeOf(n)).reduce((sum, curr) => sum + curr);
        }
        if(this.locationData) {
            size += this.locationData.getSize();
        }
        return size;
    }

    public toBuffer(): Buffer {
        const io = Stream.reserve(500 * 1024);
 

        return io.getBuffer();
    }

    public getClassString(): string {
        return this.className ? this.className.toString() : null
    }
}