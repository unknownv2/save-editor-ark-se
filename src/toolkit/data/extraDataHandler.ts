import { GameObject } from '../gameobject';
import { ArkArchive } from '../arkArchive';

export interface ExtraDataHandler {

    canHandle(object: GameObject, length: number): boolean;

    readBinary(object: GameObject, archive: ArkArchive, length: number);
}