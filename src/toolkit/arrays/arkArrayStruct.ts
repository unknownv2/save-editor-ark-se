import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { Struct } from '../structs/struct';

export class ArkArrayStruct extends ArkArray<Struct> {
    public static TYPE = ArkName.constantPlain("StructProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            // fill in
        }
        Object.setPrototypeOf(this, ArkArrayStruct.prototype);
    }
    
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayStruct {
        return new ArkArrayStruct(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayStruct.TYPE;
    }

    public setValue(object: any): void {
   
    }

    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);

        //this.forEach(element => );
    }

    public calculateSize(nameSizer: NameSizeCalculator): number {
        return 0;
    }
}