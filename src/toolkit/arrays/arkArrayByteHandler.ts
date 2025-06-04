
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import {Integer, Primitive, Byte} from '../basetypes'
import { NameSizeCalculator } from '../namesizecalculator';
import { BYTES } from '../typesizes';
import { Struct } from '../structs/struct';
import { NameCollector } from '../namecollector';
import { StructRegistry } from '../structs/structRegistry';
import { ArkByteValue } from '../types/arkByteValue';
import { ArkArrayUInt8 } from './arkArrayUInt8';
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { arch } from 'os';
import { ArkArrayByteValue } from './arkArrayByteValue';

export class ArkArrayByteHandler {

    public static TYPE: ArkName = ArkName.constantPlain('ByteProperty');

    public static create(archive: ArkArchive, property: PropertyArray): ArkArray<ArkByteValue|Byte> {

        const size = archive.getInt();

        if(property.getDataSize() < size + 4) {
            throw new Error("Found Array of ByteProperty with unexpected size.");
        }
        
        archive.position -= 4;
        if(property.getDataSize() > (size + 4)) {
            return new ArkArrayByteValue(archive, property);
        }
        else {
            return new ArkArrayUInt8(archive, property);
        }
    }
}