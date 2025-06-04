import { ArkArchive } from '../arkArchive';
import { ArkName } from '../arkName';
import { Property } from './property';

export interface PropertyBinaryConstructor {
    (archive?: ArkArchive, name?: ArkName, value?: any): Property<any>;
}