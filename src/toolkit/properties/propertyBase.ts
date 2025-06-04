import { Stream } from 'libvantage';
import { readString, writeString } from '../../util';
import { Property } from './property';
import { NameCollector } from '../namecollector';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { NameSizeCalculator } from '../namesizecalculator';
import {BYTES} from '../typesizes';

export abstract class PropertyBase<T> extends Property<T> {
    public name: ArkName;
    public dataSize: number;
    public index: number;
    public value: T;
    static TYPE: ArkName; 
    constructor(archive: ArkArchive, name: ArkName, index?:number, value?:T) {
        super();

        if(value) {
            this.from(name, index || 0, value);
        }
        else {
            this.name = name;
            this.dataSize = archive.getInt();
            this.index = archive.getInt();
        }
    }
    public from(name: ArkName, index: number, value: T) {
        this.name = name;
        this.index = index;
        this.value = value;
    }
    public getName(): ArkName {
        return this.name;
    }
    public getNameString(): string {
        return this.name.toString();
    }
    public setName(name: ArkName): void {
        this.name = name;
    }
    public setNameString(namestring: string): void {
        this.name = ArkName.from(namestring);
    }
    public getTypeString(): string {
        return typeof this;
    }
    public getDataSize(): number {
        return this.dataSize;
    }
    public setDataSize(dataSize: number): void {
        this.dataSize = dataSize;
    }
    public getIndex(): number {
        return this.index;
    }
    public setIndex(index: number): void {
        this.index = index;
    }
    public calculateAdditionalSize(nameSize: NameSizeCalculator): number {
        return 0;
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        let size = BYTES.Integer * 2;
        this.dataSize = this.calculateDataSize(nameSizer);

        size += nameSizer.sizeOf(name);
        size += nameSizer.sizeOf(this.getType());
        size += this.calculateAdditionalSize(nameSizer);
        size += this.dataSize;

        return size;
    }

    abstract writeBinaryValue(archive: ArkArchive): void;
    
    public writeBinary(archive: ArkArchive): void {
        archive.putName(this.name);
        archive.putName(this.getType());
        archive.putInt(this.dataSize);
        archive.putInt(this.index);

        this.writeBinaryValue(archive);
    }
    protected isDataSizeNeeded(): boolean {
        return false;
    }
    public collectNames(collector: NameCollector): void {
        collector.accept(this.name);
        collector.accept(this.getType());
    }
    public getValue(): T {
        return this.value;
    }
    public setValue(value: T): void {
        this.value = value;
    }
    public toString(): string {
        return `[value='${this.value}',name='${this.name}', dataSize='${this.dataSize}', index='${this.index}']`;
    }
}