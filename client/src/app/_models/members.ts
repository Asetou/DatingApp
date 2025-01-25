import { Photo } from './photos';

export interface Member {
  id: number;
  username: string;
  age: number;
  photoUrl: string;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: any;
  interests: string;
  city: string;
  country: string;
  lookingFor: string;
  photos: Photo[];
}
