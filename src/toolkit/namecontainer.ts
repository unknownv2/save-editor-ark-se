import { NameCollector } from './namecollector';

export interface NameContainer {
    collectNames(nameCollector: NameCollector): void;
}