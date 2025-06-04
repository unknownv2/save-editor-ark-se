import { Double } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayDouble extends ArkArray<Double> {

    public static TYPE = ArkName.constantPlain("DoubleProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getDouble());
        }
        Object.setPrototypeOf(this, ArkArrayDouble.prototype);
    }

    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayDouble {
        return new ArkArrayDouble(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayDouble.TYPE;
    }

    public setValue(object: number): void {
   
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putDouble(element as number));
    }

    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Double);
    }
}