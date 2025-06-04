import { ArkName } from './arkName';
import { ArkArchive } from './arkArchive';


export interface NameSizeCalculator {
    sizeOf(name: ArkName): number;
}

export class DefaultNameSizeCalculator {
    public sizeOf(name: ArkName): number {
        return ArkArchive.getStringLength(name.toString());
    }
}