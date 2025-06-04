import { ArkArchive } from '../arkArchive';
import { ArkName } from '../arkName';
import { Struct } from './struct';

export interface StructJsonConstructor {
    (archive: ArkArchive): Struct;
}