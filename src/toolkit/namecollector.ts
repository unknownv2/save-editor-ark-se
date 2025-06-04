import {ArkName} from './arkName'

export interface NameCollector {
    accept(name: ArkName): void;
}