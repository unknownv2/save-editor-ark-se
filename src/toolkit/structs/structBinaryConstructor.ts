import { ArkArchive } from '../arkArchive';
import { Struct } from './struct';

export interface StructBinaryConstructor {
    (archive: ArkArchive): Struct;
}