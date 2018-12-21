import {User} from '../auth/user';

export class Meeting {
  id: number;
  agenda: string;
  venue?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  chair?: User;
  type?: string;
  attendats?: User[];
}

export enum MeetingType {
  ARTIST_ARTIST,
  CEO_CEO,
  CEO_ARTIST,
  PRODUCER_ARTIST,
  MENTOR_ARTIST
}
