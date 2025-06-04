//import { Stream } from 'libvantage';
import { Stream } from 'libvantage';

import { GameObject } from './gameobject';
import { ArkArchive } from './arkArchive';
import { NameSizeCalculator } from './namesizecalculator';
import { BYTES } from './typesizes';
import { PropertyContainer } from './propertyContainer';
import { Property } from './properties/property';

export class ArkProfile extends PropertyContainer {
    private version: number;

    private numProfiles: number;

    private objects: GameObject[];

    private profile: GameObject;

    constructor(archive: ArkArchive) {

        super();

        this.init();

        this.readBinary(archive);
    }

    private init(): void {
        this.objects = [];
    }

    private readBinary(archive: ArkArchive): void {

        this.version = archive.getInt();

        if(this.version !== 1) {
            throw new Error('invalid ARK profile version detected');
        }

        this.numProfiles = archive.getInt();
        for(let i = 0; i < this.numProfiles; i++) {
            this.objects.push(new GameObject(archive));
        }
        for(let i = 0; i < this.numProfiles; i++) {
            const object = this.objects[i];
            if(object.getClassString() === 'PrimalPlayerData' || object.getClassString() === 'PrimalPlayerDataBP_C') {
                this.profile = object;
            }
            object.loadProperties(archive, ((i < this.numProfiles - 1) ? this.objects[i+1] : null), 0);
        } 
    }
    public getProperties(): Property<any>[] {
        return this.profile.getProperties();//properties;
    }
    public addProperty(property: any) {
        this.profile.addProperty(property);
    }
    public save(): Buffer {
        return this.writeBinary();
    }
    private writeBinary(): Buffer {

        const nameSizer = ArkArchive.getNameSizer();
        let size = BYTES.Integer * 2;
        size += this.objects.map(o => o.getSize(nameSizer)).reduce((sum, curr) => sum + curr);

        const archive = new ArkArchive(new Stream(Buffer.alloc(0x100)));

        let propertiesBlockOffset = size;
        archive.putInt(this.version);
        archive.putInt(this.objects.length);

        // store object list
        for(let object of this.objects) {
            propertiesBlockOffset = object.writeBinary(archive, propertiesBlockOffset);
        }
        // write each object's properies
        for(let object of this.objects) {
            object.writeProperties(archive, 0);
        }
        
        return archive.toBuffer();
    }
}