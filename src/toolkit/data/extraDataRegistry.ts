import { ExtraDataFallbackHandler } from './extraDataFallbackHandler';
import { ExtraDataZeroHandler } from './extraDataZeroHandler';
import { ArkArchive } from '../arkArchive';
import { ExtraData } from './extraData';
import { ExtraDataHandler } from './extraDataHandler';
import { GameObject } from '../gameobject';

export class ExtraDataRegistry {

    /*
    public static TYPE_MAP1 = {
        PropertyInt : PropertyInt
    };
        public static TYPE_MAP2 = {
        PropertyInt : PropertyInt
    };
    */
  //  public static TYPE_MAP3: any = {};
    //public static EXTRA_DATA_FALLBACK_HANDLER: ExtraDataFallbackHandler[] = [];
    public static EXTRA_DATA_HANDLERS: ExtraDataHandler[] = [];

    public static addHandler(binary: ExtraDataHandler): void {
        this.EXTRA_DATA_HANDLERS.push(binary);
    }
   
    static construct() {
        this.addHandler(new ExtraDataZeroHandler);
    }
    public static getExtraData(object: GameObject, archive: ArkArchive, length: number): ExtraData {
        const position = archive.position;

        try {
            for(let i = ExtraDataRegistry.EXTRA_DATA_HANDLERS.length - 1; i >= 0; i--) {
                const handler = ExtraDataRegistry.EXTRA_DATA_HANDLERS[i];
                if(handler.canHandle(object, length)) {
                    return handler.readBinary(object, archive, length);
                }
            }
        }
        catch {
            throw new Error("error extra data");
        }

        return null;
    }
}
