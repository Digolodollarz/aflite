import {User} from '../auth/user';
import {SafeResourceUrl} from '@angular/platform-browser';

export class PracticeSession {
  id: number;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  location?: string;
  user?: User;
  fileUrl?: string;
  safeFileUrl?: SafeResourceUrl;
}
