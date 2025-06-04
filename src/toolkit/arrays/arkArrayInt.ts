import { Integer } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';

export class ArkArrayInt extends ArkArray<Integer> {

    public static TYPE = ArkName.constantPlain("IntProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(archive.getInt());
        }
        Object.setPrototypeOf(this, ArkArrayInt.prototype);

    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayInt {
        return new ArkArrayInt(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayInt.TYPE;
    }

    public setValue(object: number): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        this.forEach(element => archive.putInt(element as number));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return 0;
    }
}