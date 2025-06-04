import { ArkName } from '../arkName';
import { StructBinaryConstructor} from './structBinaryConstructor';
import {StructJsonConstructor} from './structJsonConstructor';

import { ArkArchive } from '../arkArchive';
import { StructVector } from './structVector';
import { StructUniqueNetIdRepl } from './structUniqueNetIdRepl';

import { StructPropertyList } from './structPropertyList';
import { Struct } from './struct';
import { StructLinearColor } from './structLinearColor';

export class StructRegistry {

    public static TYPE_MAP: BinaryHashMap[] = [];
    public static TYPE_JSON_MAP: JsonHashMap[] = [];

    public static addStruct(name: string, binary: StructBinaryConstructor, json?: StructJsonConstructor): void {
        this.TYPE_MAP[name.toString()] = binary;
        this.TYPE_JSON_MAP[name.toString()] = json;
    }
    static construct() {
        this.addStruct("Vector", StructVector.create);
        this.addStruct("UniqueNetIdRepl", StructUniqueNetIdRepl.create);
        this.addStruct("LinearColor", StructLinearColor.create);

    }
    public static readBinary(archive: ArkArchive, structType: ArkName): Struct {

        if(this.TYPE_MAP[structType.toString()]) {
            return this.TYPE_MAP[structType.toString()](archive);
        }
        try {
            return new StructPropertyList(archive);
        }
        catch {
            throw new Error("Unknown struct type");
        }
    }
}

interface BinaryHashMap {
    [name:string]: StructBinaryConstructor;
}
interface JsonHashMap {
    [name:string]: StructJsonConstructor;
}