import { BigInteger } from 'big-integer';

export interface Primitive extends Number {
}
export interface Byte extends Primitive {
}
export interface Bool extends Boolean {
}
export interface Integer extends Primitive {
}
export interface Long extends BigInteger {
}
export interface Float extends Primitive {
}
export interface Double extends Primitive {
}
export interface Short extends Primitive {
}