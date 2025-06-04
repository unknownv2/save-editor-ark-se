import { NameContainer } from '../namecontainer';
import { ArkArchive } from '../arkArchive';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';

export abstract class Struct implements NameContainer {

    abstract collectNames(nameCollector: NameCollector): void;

    abstract isNative(): boolean;

    abstract writeBinary(archive: ArkArchive): void;
    
    abstract getSize(nameSizer: NameSizeCalculator): number;
}