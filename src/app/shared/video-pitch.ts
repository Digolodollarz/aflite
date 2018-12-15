import {User} from '../auth/user';

export class VideoPitch {
  id: number;
  title: string;
  date?: Date;
  artists?: User;
  fileUrl?: string;
}
