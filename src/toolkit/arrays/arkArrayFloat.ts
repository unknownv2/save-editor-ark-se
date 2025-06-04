import { Float } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';

export class ArkArrayFloat extends ArkArray<Float> {

    public static TYPE = ArkName.constantPlain("FloatProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getFloat());
        }
        Object.setPrototypeOf(this, ArkArrayFloat.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayFloat {
        return new ArkArrayFloat(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayFloat.TYPE;
    }

    public setValue(object: number): void {
   
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putFloat(element as number));
    }

    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.length * BYTES.Float);
    }
}