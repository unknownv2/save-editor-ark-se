import { ArkName } from '../arkName';
import { PropertyBinaryConstructor} from './propertyBinaryConstructor';
import { PropertyInt } from './propertyInt';
import {PropertyStruct} from './propertyStruct';

import { ArkArchive } from '../arkArchive';
import { Property } from './property';
import { PropertyByte } from './propertyByte';
import { PropertyBool } from './propertyBool';
import { PropertyInt64 } from './propertyInt64';
import { PropertyUInt64 } from './propertyUInt64';
import { PropertyInt16 } from './propertyInt16';
import { PropertyUInt16 } from './propertyUInt16';
import { PropertyStr } from './propertyStr';
import { PropertyFloat } from './propertyFloat';
import { PropertyObject } from './propertyObject';
import { PropertyBase } from './propertyBase';
import { PropertyArray } from './propertyArray';

export interface PropertyJsonConstructor {
    appendFileSync(node: any): Property<any>;
}
interface RegistryItem<T> {
    typeof (PropertyBase) : PropertyBase<T>;
}
export class PropertyRegistry {

    public static TYPE_MAP: HashMap[] = [];

    public static addProperty(name: ArkName,
         binary: PropertyBinaryConstructor, json?: PropertyJsonConstructor): void {
            this.TYPE_MAP[name.toString()] = binary;
    }
   
    static construct() {
        this.addProperty(PropertyInt.TYPE, PropertyInt.create);
        this.addProperty(PropertyStruct.TYPE, PropertyStruct.create);
        this.addProperty(PropertyByte.TYPE, PropertyByte.create);
        this.addProperty(PropertyBool.TYPE, PropertyBool.create);
        this.addProperty(PropertyInt64.TYPE, PropertyInt64.create);
        this.addProperty(PropertyUInt64.TYPE, PropertyUInt64.create);
        this.addProperty(PropertyInt16.TYPE, PropertyInt16.create);
        this.addProperty(PropertyUInt16.TYPE, PropertyUInt16.create);
        this.addProperty(PropertyStr.TYPE, PropertyStr.create);
        this.addProperty(PropertyFloat.TYPE, PropertyFloat.create);
        this.addProperty(PropertyObject.TYPE, PropertyObject.create);
        this.addProperty(PropertyArray.TYPE, PropertyArray.create);
    }
    public static readBinary(archive: ArkArchive): Property<any> {

        const name = archive.getName();
        if(name.equals(ArkName.NAME_NONE)) {
            return null;
        }
        const type = archive.getName();

        if(!this.TYPE_MAP[type.toString()]) {
            throw new Error('property type is not supporter');
        }

        return this.TYPE_MAP[type.toString()](archive, name);
    }
    public static createFrom(type: string, name: string, index: number, value: any): Property<any> {
        return this.TYPE_MAP[type](null, ArkName.from(name), index, value); 
    }
}

interface HashMap {
    [name:string]: PropertyBinaryConstructor;
}