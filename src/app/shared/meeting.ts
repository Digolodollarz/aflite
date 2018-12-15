import {User} from '../auth/user';

export class Meeting {
  id: number;
  agenda: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  chair?: User;
  typeId?: number;
}

export enum MeetingType {
  ARTIST_ARTIST,
  CEO_CEO,
  CEO_ARTIST,
  PRODUCER_ARTIST,
  MENTOR_ARTIST
}
