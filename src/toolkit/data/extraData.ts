import { NameSizeCalculator } from '../namesizecalculator';
import { ArkArchive } from '../arkArchive';

export interface ExtraData {

    calculateSize(nameSizer: NameSizeCalculator): number;

    writeBinary(archive: ArkArchive);
}