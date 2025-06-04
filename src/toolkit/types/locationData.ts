import { Stream } from 'libvantage';
import { ArkArchive } from '../arkArchive';
import { BYTES } from '../typesizes';

export class LocationData
{
    public X : number;
    public Y : number;
    public Z : number;
    public pitch : number;
    public yaw : number;
    public roll : number;
    constructor(archive?: ArkArchive)   {
        if(archive) {
            this.read(archive);
        }
        else {
            this.X = 0;
            this.Y = 0;
            this.Z = 0;
            this.pitch = 0;
            this.yaw = 0;
            this.roll = 0;
        }
    }

    static copyFrom(location: LocationData): LocationData {
        const temp = new LocationData();
        temp.X = location.X;
        temp.Y = location.Y;
        temp.Z = location.Z;
        temp.pitch = location.pitch;
        temp.yaw = location.yaw;
        temp.roll = location.roll;
        return temp;        
    }

    private read(archive?: ArkArchive): void {
        this.X = archive.getFloat();
        this.Y = archive.getFloat();
        this.Z = archive.getFloat();
        this.pitch = archive.getFloat();
        this.yaw = archive.getFloat();
        this.roll = archive.getFloat(); 
    }

    public toBuffer(): Buffer {
        const io = Stream.reserve(12);
        io.writeFloat(this.X);
        io.writeFloat(this.Y);
        io.writeFloat(this.Z);
        io.writeFloat(this.pitch);
        io.writeFloat(this.yaw);
        io.writeFloat(this.roll); 
        return io.getBuffer();
    }
    public getSize(): number {
        return BYTES.Float * 6;
    }
}