import { Integer } from '../basetypes';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { NameSizeCalculator } from '../namesizecalculator';
import { NameCollector } from '../namecollector';
import { BYTES } from '../typesizes';
import { ArkArrayInt8 } from './arkArrayInt8';
import { ArkArrayByteHandler } from './arkArrayByteHandler';

export class ArkArrayUInt8 extends ArkArrayInt8 {
 
    constructor(archive: ArkArchive, property: PropertyArray) {
        super(archive, property);

        Object.setPrototypeOf(this, ArkArrayUInt8.prototype);
    }
    public static create(archive: ArkArchive, property: PropertyArray): ArkArrayUInt8 {
        return new ArkArrayUInt8(archive, property);
    }
    public getType(): ArkName {
        return ArkArrayByteHandler.TYPE;
    }
}