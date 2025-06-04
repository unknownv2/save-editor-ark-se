import { NameContainer } from '../namecontainer';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';

export abstract class ArkArray<T> extends Array<T> {

    abstract getType(): ArkName;

    abstract setValue(value: T): void;
    
    abstract calculateSize(nameSizer?: NameSizeCalculator): number;

    abstract writeBinary(archive: ArkArchive): void;
}