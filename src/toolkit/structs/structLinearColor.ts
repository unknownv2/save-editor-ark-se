import { StructBase } from './structBase';
import { ArkArchive } from '../arkArchive';
import { BYTES } from '../typesizes';
import { NameSizeCalculator } from '../namesizecalculator';


export class StructLinearColor extends StructBase {
    
    private r: number;
    private g: number;
    private b: number;
    private a: number;

    constructor(archive: ArkArchive) {
        super();

        this.r = archive.getFloat();
        this.g = archive.getFloat();
        this.b = archive.getFloat();
        this.a = archive.getFloat();        
    }

    public static create(archive: ArkArchive): StructLinearColor {
        return new StructLinearColor(archive);
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putFloat(this.r);
        archive.putFloat(this.g);
        archive.putFloat(this.b);
        archive.putFloat(this.a);        
    }

    public getSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Float * 4;
    }
}