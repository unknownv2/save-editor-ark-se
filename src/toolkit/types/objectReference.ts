import { NameContainer } from '../namecontainer';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { NameCollector } from '../namecollector';
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';

const enum ObjectType {
    Id = 0,
    Path = 1,
    PathNoType = 2,
}

export class ObjectReference implements NameContainer {
 
    public length: number;
    public objectType: number;
    public objectId: number;

    private objectString: ArkName;

    constructor(archive: ArkArchive, length: number) {
        this.length = length;
        this.readBinary(archive);
    }
    public getTypeString(): string {
        return typeof this;
    }
    public get Length(): number {
        return this.length;
    }
    public set Length(dataSize: number) {
        this.length = dataSize;
    }
    public get ObjectType(): number {
        return this.objectType;
    }
    public set ObjectType(objectType: number) {
        this.objectType = objectType;
    }
    public get ObjectId(): number {
        return this.objectType;
    }
    public set ObjectId(objectId: number) {
        this.objectId = objectId;
    }
    public get ObjectString(): string {
        return this.objectString.toString();
    }
    public set ObjectString(objectString: string) {
        this.objectString = ArkName.from(objectString);
    }    
    public readBinary(archive: ArkArchive): void {
        if(this.length >= 8) {
            this.objectType = archive.getInt();
            if(this.objectType == ObjectType.Id) {
                this.objectId = archive.getInt();
            }
            else if(this.objectType == ObjectType.Path) {
                this.objectString = archive.getName();
            }
        }
        else if(this.length === 4) {
            this.objectType = ObjectType.Id;
            this.objectId = archive.getInt();
        }
        else {
            throw new Error("Invalid ObjectReference");
        }
    }
    public writeBinary(archive: ArkArchive): void {
        if (this.objectType == ObjectType.Path || length >= 8 && this.objectType != ObjectType.PathNoType) {
            archive.putInt(this.objectType);
        }
        if (this.objectType == ObjectType.Id) {
            archive.putInt(this.objectId);
        } 
        else if (this.objectType == ObjectType.Path || this.objectType == ObjectType.PathNoType) {
            archive.putName(this.objectString);
        }
    }
    protected isDataSizeNeed(): boolean {
        return false;
    }
    public collectNames(collector: NameCollector): void {
        if(this.objectType === ObjectType.Path) {
            collector.accept(this.objectString);
        }
    }
    public isId(): boolean {
        return this.objectType === ObjectType.Id;
    }
    public isPath(): boolean {
        return this.objectType === ObjectType.Path;
    }
    public toString(): string {
        return `[ObjectReference [objectType="'${this.objectType}',objectId='${this.objectId}', objectString='${this.objectString}', length='${this.length}']`;
    }
    public getSize(nameSizer: NameSizeCalculator): number {
        if(this.objectType == ObjectType.Id) {
            return this.length;
        }
        else if(this.objectType == ObjectType.Path) {
            return BYTES.Integer + nameSizer.sizeOf(this.objectString);
        }
        else if(this.objectType == ObjectType.PathNoType) {
            return nameSizer.sizeOf(this.objectString);
        }
        else {
            return this.length;
        }
    }
}