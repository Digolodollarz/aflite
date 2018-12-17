import {User} from '../auth/user';

export class Song {
  id: number;
  title: string;
  date?: Date;
  artist?: User;
  producer?: User;
  fileUrl?: string;
  thumbUrl?: string;
}
