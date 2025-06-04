import { ObjectReference } from '../types/objectReference';
import { ArkArray } from './arkArray';
import { ArkArchive } from '../arkArchive';
import { NameSizeCalculator } from '../namesizecalculator';
import { ArkName } from '../arkName';
import { NameCollector } from '../namecollector';
import { PropertyArray } from '../properties/propertyArray';
import { BYTES } from '../typesizes';

export class ArkArrayObjectReference extends ArkArray<ObjectReference> {

    public static TYPE = ArkName.constantPlain("ObjectProperty");
  
    constructor(archive: ArkArchive, property: PropertyArray) {
        super();

        const size = archive.getInt();
        for(let n = 0; n < size; n++) {
            this.push(new ObjectReference(archive, 8));
        }
        Object.setPrototypeOf(this, ArkArrayObjectReference.prototype);
    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayObjectReference {
        return new ArkArrayObjectReference(archive, property);
    }
    
    public getType(): ArkName {
        return ArkArrayObjectReference.TYPE;
    }
    public getValue(): ArkName {
        return ArkArrayObjectReference.TYPE;
    }
    public setValue(object: ObjectReference): void {

    }
    public writeBinary(archive: ArkArchive): void {
        archive.putInt(this.length);
        this.forEach(p=> p.writeBinary(archive));
    }
    public calculateSize(nameSizer: NameSizeCalculator): number {
        return BYTES.Integer + (this.reduce((a, p) => (a + p.getSize(nameSizer)), 0));
    }
    public collectNames(collector: NameCollector): void {
        this.forEach(element => {
            element.collectNames(collector);
        });
    }    
}