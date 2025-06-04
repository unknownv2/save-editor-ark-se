
import { PropertyArray } from '../properties/propertyArray';
import { ArkArray } from './arkArray';
import { ArkArchive } from '../arkArchive';

export interface ArkArrayBinaryConstructor {
    (archive: ArkArchive, property: PropertyArray): ArkArray<any>;
}