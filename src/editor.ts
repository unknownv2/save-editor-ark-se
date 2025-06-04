import { ArkProfile } from './toolkit/arkProfile';
import { ArkArchive } from './toolkit/arkArchive';
import { Stream } from 'libvantage';
import { PropertyRegistry } from './toolkit/properties/propertyRegistry';
import { StructRegistry } from './toolkit/structs/structRegistry';
import { ArkArrayRegistry } from './toolkit/arrays/arkArrayRegistry';
import { ExtraDataRegistry } from './toolkit/data/extraDataRegistry';
import { StructPropertyList } from './toolkit/structs/structPropertyList';
import { PropertyContainer } from './toolkit/propertyContainer';
import { ArkName } from './toolkit/arkName';

export class Editor {
    private buffer: Buffer;
    public playerName: string;

    private profile: ArkProfile;
    private config: PropertyContainer;
    private playerStats: PropertyContainer;

    public playerMax: number = 130;
    public expMax: number = 1000000;    
    public engramMax: number = 100000;

    public editorValues: EditorValue[];
    public info: string ;

    public load(buffer: Buffer) {

        this.info = 'Respawn to update character level';
        this.buffer = buffer;

        // register handlers
        ExtraDataRegistry.construct();
        ArkArrayRegistry.construct();
        StructRegistry.construct();
        PropertyRegistry.construct();

        // read profile data
        this.profile = new ArkProfile(new ArkArchive(new Stream(buffer)));
        const myData = this.profile.getPropertyValue<StructPropertyList>("MyData", StructPropertyList);
        const config = myData.getPropertyValue<PropertyContainer>('MyPlayerCharacterConfig', PropertyContainer);
        const playerStats = myData.getPropertyValue<PropertyContainer>('MyPersistentCharacterStats', PropertyContainer);

        const profileName = config.getPropertyValue<string>('PlayerCharacterName', 'string');
        this.playerName = profileName;

        this.config = config;
        this.playerStats = playerStats;

        // create values for the editor display
        this.editorValues = [
            {
                property:  (playerStats.getPropertyValue<number>('CharacterStatusComponent_ExtraCharacterLevel', 'number') || 0) + 1,
                maxValue: this.playerMax
            },
            {
                property: playerStats.getPropertyValue<number>('CharacterStatusComponent_ExperiencePoints', 'number') || 0,
                maxValue: this.expMax
            },
            {
                property: playerStats.getPropertyValue<number>('PlayerState_TotalEngramPoints', 'number') || 0,
                maxValue: this.engramMax
            },            
        ];
    }

    public save(): Buffer {
        
        this.config.setCreatePropertyValue<string>('PlayerCharacterName',this.playerName, 'StrProperty');
        this.playerStats.setCreatePropertyValue<number>('CharacterStatusComponent_ExperiencePoints', this.editorValues[Stats.Experience].property, 'FloatProperty');
        
        this.playerStats.setCreatePropertyValue<number>('PlayerState_TotalEngramPoints', this.editorValues[Stats.EngramPoints].property, 'IntProperty');
        this.playerStats.setCreatePropertyValue<number>('CharacterStatusComponent_ExtraCharacterLevel', this.editorValues[Stats.PlayerLevel].property - 1, 'UInt16Property');
        
        // serialize profile to a binary buffer
        return this.profile.save();
    }

    public maxValue(index: number): void {
        this.editorValues[index].property = this.editorValues[index].maxValue;
    }
}

export class PrecisionValueConverter {
    public toView(value: number, precision: number): string {
        if(value) {
            return value.toFixed(precision);
        }
        return '0';
    }
  
    public fromView(value: string): number {
    if(value) {
        return parseFloat(value);
      }
      return 0;
   }
}
export const enum Stats {
    PlayerLevel = 0,
    Experience = 1,
    EngramPoints = 2,
}
interface EditorValue {
    property: number;
    maxValue: number;
}