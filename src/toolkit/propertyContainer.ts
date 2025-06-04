import { Property } from './properties/property';
import { Stream } from 'libvantage';

export abstract class PropertyContainer implements Iterator<any> {

    abstract getProperties(): Property<any>[];
    abstract addProperty(property: any): void;

    pointer: number = 0;

    public getProperty(name: string, index?: number): Property<any> {
        for(let prop of this.getProperties()) {
            if(prop.getIndex() === (index || 0) && prop.getNameString() === name) {
                return prop;
            }
        }
        return null;
    }

    public getPropertyValue<T>(name: string, type?: any, index?: number): T {
        for(let prop of this.getProperties()) {
            if( (prop.getIndex() === (index || 0)) && (prop.getNameString() === name)
        && (type ? ((typeof(type) == 'string' ? (typeof prop.getValue() == type) : (prop.getValue() instanceof type))) : true)) {
                return <T>prop.getValue();
            }
        }
        return null;
    }
    public setPropertyValue<T>(name: string, property?: any, type?: any, index?: number): void{
        for(let prop of this.getProperties()) {
            if( (prop.getIndex() === (index || 0)) && (prop.getNameString() === name)
        && (type ? ((typeof(type) == 'string' ? (typeof prop.getValue() == type) : (prop.getValue() instanceof type))) : true)) {
                prop.setValue(<T>property);
                break;
            }
        }
    }

    public setCreatePropertyValue<T>(name: string, property?: any, type?: any, index?: number): void{
        for(let prop of this.getProperties()) {
            if( (prop.getIndex() === (index || 0)) && (prop.getNameString() === name)) {
                prop.setValue(<T>property);
                return;
            }
        }
        this.addProperty( {
            name: name,
            value: <T>property,
            type: type,
            index: index
        })
    } 
    public next(): IteratorResult<any> {
        const props = this.getProperties();
        if (this.pointer < props.length) {
            return {
                done: false,
                value: props[this.pointer++]
            }
        }
        else {
          return {
            done: true,
            value: null
          }
        }
    }
}