import { NameContainer } from '../namecontainer';
import { NameCollector } from '../namecollector';
import { ArkName } from '../arkName';
import { NameSizeCalculator } from '../namesizecalculator';
import { ArkArchive } from '../arkArchive';
import { Primitive } from '../basetypes'

export abstract class Property<T> implements NameContainer {

    //abstract getValueClass(): Primitive; // typeof(T)
    abstract collectNames(nameCollector: NameCollector): void;
    abstract getName(): ArkName;
    abstract getNameString(): string;

    abstract setName(name: ArkName): void;
    abstract setNameString(nameString: string): void;

    abstract getType(): ArkName;
    abstract getTypeString(): string;

    abstract getDataSize(): number;
    abstract setDataSize(length: number);

    abstract getIndex(): number;
    abstract setIndex(index: number): void;

    abstract getValue(): T;
    abstract setValue(value: T): void;
    
    abstract calculateDataSize(nameSizer?: NameSizeCalculator): number;
    abstract calculateSize(nameSizer: NameSizeCalculator): number;

    abstract writeBinary(archive: ArkArchive): void;
}