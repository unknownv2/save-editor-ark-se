import { ExtraDataHandler } from './extraDataHandler';
import { GameObject } from '../gameobject';
import { ArkArchive } from '../arkArchive';
import { ExtraData } from './extraData';


export class ExtraDataFallbackHandler implements ExtraDataHandler {

    canHandle(object: GameObject, length: number): boolean {
        return false;
    }

    readBinary(object: GameObject, archive: ArkArchive, length: number): ExtraData {

        return null;
    }
}