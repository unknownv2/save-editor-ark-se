import { ArkArchive } from '../arkArchive';
import {StructBase} from './structBase'
import {BYTES} from '../typesizes'
import { NameSizeCalculator } from '../namesizecalculator';

export class StructVector extends StructBase {

    private x: number;
    private y: number;
    private z: number;

    constructor(archive: ArkArchive) {
        super();

        this.x = archive.getFloat();
        this.y = archive.getFloat();
        this.z = archive.getFloat();
    }

    public static create(archive: ArkArchive): StructVector {
        return new StructVector(archive);
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putFloat(this.x);
        archive.putFloat(this.y);
        archive.putFloat(this.z);
    }

    public getSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Float * 3;
    }
   
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getZ(): number {
        return this.z;
    }   
    public setX(value: number): void {
        this.x = value;
    }
    public setY(value: number): void {
        this.y = value;
    }
    public setZ(value: number): void {
        this.z = value;
    }    
}