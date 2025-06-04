import { ExtraData } from './extraData';
import { ArkArchive } from '../arkArchive';
import { NameSizeCalculator } from '../namesizecalculator';

export class ExtraDataZero implements ExtraData {
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return 4;
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(0);
    }
}