import { ExtraDataHandler } from './extraDataHandler';
import { ExtraDataZero } from './extraDataZero';
import { GameObject } from '../gameobject';
import { ArkArchive } from '../arkArchive';
import { ExtraData } from './extraData';

export class ExtraDataZeroHandler implements ExtraDataHandler {

    // instance will always be the same so need only one
    public static INSTANCE: ExtraDataZero = new ExtraDataZero();

    public canHandle(objet: GameObject, length: number): boolean {
        return length === 4;
    }
    public readBinary(object: GameObject, archive: ArkArchive, length: number): ExtraData {
        const shouldBeZero = archive.getInt();
        if(shouldBeZero !== 0) {
            throw new Error("Unexpected value, expected zero");
        }

        return ExtraDataZeroHandler.INSTANCE;
    }
}