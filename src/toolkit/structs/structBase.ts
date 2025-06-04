import {Struct} from './struct'
import { NameCollector } from '../namecollector';

export abstract class StructBase extends Struct {

    public isNative(): boolean {
        return true;
    }

    public collectNames(collector: NameCollector): void {

    }
}