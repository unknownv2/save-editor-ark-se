
import { ArkArrayObjectReference } from './arkArrayObjectReference';
import { ArkArrayBinaryConstructor } from './arkArrayBinaryConstructor';

import { PropertyArray } from '../properties/propertyArray';
import { ArkName } from '../arkName';
import { ArkArchive } from '../arkArchive';
import { ArkArray } from './arkArray';
import { ArkArrayInt } from './arkArrayInt';
import { ArkArrayFloat } from './arkArrayFloat';
import { ArkArrayInt64 } from './arkArrayInt64';
import { ArkArrayUInt64 } from './arkArrayUInt64';
import { ArkArrayInt16 } from './arkArrayInt16';
import { ArkArrayUInt32 } from './arkArrayUInt32';
import { ArkArrayName } from './arkArrayName';
import { ArkArrayUInt16 } from './arkArrayUInt16';
import { ArkArrayInt8 } from './arkArrayInt8';
import { ArkArrayByteHandler } from './arkArrayByteHandler';
import { ArkArrayDouble } from './arkArrayDouble';
import { ArkArrayBool } from './arkArrayBool';
import { ArkArrayString } from './arkArrayString';
import { ArkArrayStruct } from './arkArrayStruct';


export class ArkArrayRegistry {

    public static TYPE_MAP: BinaryHashMap[] = [];
    //public static TYPE_JSON_MAP: JsonHashMap[] = [];

    public static addStruct(name: ArkName, binary: ArkArrayBinaryConstructor, json?: any): void {
        this.TYPE_MAP[name.toString()] = binary;
    }
    static construct() {
        this.addStruct(ArkArrayInt8.TYPE, ArkArrayInt8.create);
        this.addStruct(ArkArrayByteHandler.TYPE, ArkArrayByteHandler.create);        
        this.addStruct(ArkArrayInt16.TYPE, ArkArrayInt16.create);
        this.addStruct(ArkArrayUInt16.TYPE, ArkArrayUInt16.create);  
        this.addStruct(ArkArrayInt.TYPE, ArkArrayInt.create);                      
        this.addStruct(ArkArrayUInt32.TYPE, ArkArrayUInt32.create);        
        this.addStruct(ArkArrayInt64.TYPE, ArkArrayInt64.create);        
        this.addStruct(ArkArrayUInt64.TYPE, ArkArrayUInt64.create);
        this.addStruct(ArkArrayFloat.TYPE, ArkArrayFloat.create);
        this.addStruct(ArkArrayDouble.TYPE, ArkArrayDouble.create);
        this.addStruct(ArkArrayBool.TYPE, ArkArrayBool.create);
        this.addStruct(ArkArrayString.TYPE, ArkArrayString.create);
        this.addStruct(ArkArrayName.TYPE, ArkArrayName.create);
        this.addStruct(ArkArrayObjectReference.TYPE, ArkArrayObjectReference.create);
        this.addStruct(ArkArrayStruct.TYPE, ArkArrayStruct.create);
        
    }
    public static readBinary(archive: ArkArchive, arrayType: ArkName, property: PropertyArray): ArkArray<any> {

        if(this.TYPE_MAP[arrayType.toString()]) {
            return this.TYPE_MAP[arrayType.toString()](archive, property);
        }
        else{
            throw new Error("Unknown struct type");
        }
    }
}

interface BinaryHashMap {
    [name:string]: ArkArrayBinaryConstructor;
}
interface JsonHashMap {
    [name:string]: any;
}