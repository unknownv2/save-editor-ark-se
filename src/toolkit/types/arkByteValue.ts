import { NameContainer } from '../namecontainer';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { NameCollector } from '../namecollector';
import { NameSizeCalculator } from '../namesizecalculator';

export class ArkByteValue implements NameContainer {
 
    public byteValue: number;

    private nameValue: ArkName;

    constructor(archive?: ArkArchive, isName?: boolean, nameValue?: ArkName, byteValue?: number) {
        if(name) {
            this.nameValue = nameValue;
        }
        else if(byteValue) {
            this.setByteValue(byteValue);
        }
        else {
            this.readBinary(archive, isName);
        }
    }

    public getTypeString(): string {
        return typeof this;
    }
    public get ByteValue(): number {
        return this.byteValue;
    }
    public set ByteValue(byteValue: number) {
        this.byteValue = byteValue;
    }
    public get NameValue(): ArkName {
        return this.nameValue;
    }
    public set NameValue(nameValue: ArkName) {
        this.nameValue = nameValue;
    }
    public setByteValue(byteValue: number) {
        this.nameValue = null;
        this.byteValue = byteValue;
    }
    public readBinary(archive: ArkArchive, name:boolean): void {
        if(name) {
            this.nameValue = archive.getName();
        }
        else {
            this.byteValue = archive.getByte();
        }
    }
 
    public writeBinary(archive: ArkArchive): void {
        if(this.nameValue) {
            archive.putName(this.nameValue);
        }
        else {
            archive.putByte(this.byteValue);
        }
    }

    public collectNames(collector: NameCollector): void {
        if(this.nameValue) {
            collector.accept(this.nameValue);
        }
    }
    public getSize(nameSizer: NameSizeCalculator): number {
        return this.nameValue != null ? nameSizer.sizeOf(this.nameValue) : 1;
    }
}