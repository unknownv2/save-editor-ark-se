import { ArkName } from './arkName';
import {Stream} from 'libvantage';

import {readString} from '../util';
import { BigInteger } from 'big-integer';
import { NameSizeCalculator, DefaultNameSizeCalculator } from './namesizecalculator';
import * as bigInteger  from 'big-integer';

export class ArkArchive {
    
    private io: Stream;

    public static getNameSizer(): NameSizeCalculator {
        return new DefaultNameSizeCalculator();
    }
    constructor(io: Stream) {
        this.io = io;
    }
    get position(): number {
        return this.io.position;
    }
    set position(value: number) {
        this.io.position = value;
    }
    public getInt(): number {
        return this.io.readInt32();
    }
    public putInt(value: number): void {
        this.io.writeUInt32(value);
    }
    public getUInt(): number {
        return this.io.readInt32();
    }
    public putUInt(value: number): void {
        this.io.writeUInt32(value);
    } 
    public getLong(): BigInteger {
        return this.io.readInt64();
    }
    public getULong(): BigInteger {
        return this.io.readUInt64();
    }
    public putLong(value: BigInteger|number) {
        this.io.writeInt64(value);
    }
    public putULong(value: BigInteger|number) {
        this.io.writeUInt64(value);
    }
    public putName(name: ArkName): void {
        this.putString(name.toString());
    }
    public getName(): ArkName {
        return ArkName.from(readString(this.io));
    }
    public getBoolean(): boolean {
        return this.io.readInt32() !== 0;
    }
    public putBoolean(value: boolean): void {
        this.io.writeBoolean(value);
    }
    public getUuid(): Buffer {
        return this.io.readBytes(0x10);
    }
    public getFloat(): number {
        return this.io.readFloat();
    }
    public putFloat(value: number) {
        this.io.writeFloat(value);
    }
    public getDouble(): number {
        return this.io.readDouble();
    }
    public putDouble(value: number) {
        this.io.writeDouble(value);
    } 
    public getBytes(size: number): Buffer {
        return this.io.readBytes(size);
    }
    public getByte(): number {
        return this.io.readByte();
    }
    public putByte(value: number): void {
        this.io.writeByte(value);
    }
    public putBytes(value: Buffer): void {
        this.io.writeBytes(value);
    }
    public getShort(): number {
        return this.io.readInt16();
    }
    public putShort(value: number): void {
        this.io.writeInt16(value);
    }
    public getUShort(): number {
        return this.io.readUInt16();
    }
    public putUShort(value: number): void {
        this.io.writeUInt16(value);
    }    
    public getString(): string {
        return this.getName().toString(); // fix later
    }
    public putString(value: string):void {
        this.io.writeInt32(value.length + 1);
        this.io.writeString(value.toString(), "utf8", true);
    }
    public static getStringLength(value: string): number {
        if(value == null) {
            return 4;
        }
        if(value === '') {
            return 5;
        }
        const length = value.length + 1;
        const multiByte = !this.isASCII(value);
        return (multiByte ? length * 2 : length) + 4;
    }
    private static isASCII(str: string):boolean {
        return /^[\x00-\x7F]*$/.test(str);
    }
    public limit(): number {
        return this.io.length;
    }
    public toBuffer(): Buffer {
        return this.io.getBuffer();
    }
}