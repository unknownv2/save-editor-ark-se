import { ArkArchive } from '../arkArchive';
import {StructBase} from './structBase'
import {BYTES} from '../typesizes'
import { NameSizeCalculator } from '../namesizecalculator';
import { ArkName } from '../arkName';

export class StructUniqueNetIdRepl extends StructBase {

    private unknown: number;
    private netId: ArkName;


    constructor(archive: ArkArchive) {
        super();

        this.unknown = archive.getInt();
        this.netId = archive.getName();
    }

    public static create(archive: ArkArchive): StructUniqueNetIdRepl {
        return new StructUniqueNetIdRepl(archive);
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.unknown);
        archive.putString(this.netId.toString());
    }

    public getSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + ArkArchive.getStringLength(this.netId.toString());
    }
}