export class Room {
  id: number;
  roomname: string;
  description?: string;
  password: boolean;
  datecreation: any;
  image?: string;
  estactif: boolean;
  statusImage?: string;
  currentImage?: string;
  isHovering?: boolean = false;
}
