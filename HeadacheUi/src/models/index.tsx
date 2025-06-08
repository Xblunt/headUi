
// TAG
export class Tag {
  uuid: string;
  tagName: string;

  constructor(props: {
    uuid: string;
    tagName: string;

  }) {
    this.uuid = props.uuid;
    this.tagName = props.tagName;
  }
};

// FILE
export class File {
  uuid: string;
  data: Uint8Array;
  extension: FileExtension;
  type: FileType;

  constructor(props: {
    uuid: string;
    data: Uint8Array;
    extension: FileExtension;
    type: FileType;
  }) {
    this.uuid = props.uuid;
    this.data = props.data;
    this.extension = props.extension;
    this.type = props.type;
  }
};

// USER

// export class User {
//   uuid?: string;
//   login?: string;
//   password?: string;
//   roles: string[];
//   isAccountNonLocked?: boolean;
//   isActive?: boolean;
//   description?: string;
//   imgFileUUID?: string;
//   phoneNumber?: string;
//   email?: string;
//   birthDate?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   lastVisitDate?: string;
//   avgRating?: number;
//   savedSongsUUIDs?: string[];

//   constructor(props: {
//     uuid: string;
//     login: string;
//     password: string;
//     roles: string[];
//     isAccountNonLocked: boolean;
//     isActive: boolean;
//     description: string;
//     imgFileUUID: string;
//     phoneNumber: string;
//     email: string;
//     birthDate: string;
//     createdAt: string;
//     updatedAt: string;
//     lastVisitDate: string;
//     avgRating: number;
//     savedSongsUUIDs: string[];
//   }) {
//     this.uuid = props.uuid;
//     this.login = props.login;
//     this.password = props.password;
//     this.roles = props.roles;
//     this.isAccountNonLocked = props.isAccountNonLocked;
//     this.isActive = props.isActive;
//     this.description = props.description;
//     this.imgFileUUID = props.imgFileUUID;
//     this.phoneNumber = props.phoneNumber;
//     this.email = props.email;
//     this.birthDate = props.birthDate;
//     this.createdAt = props.createdAt;
//     this.updatedAt = props.updatedAt;
//     this.lastVisitDate = props.lastVisitDate;
//     this.avgRating = props.avgRating;
//     this.savedSongsUUIDs = props.savedSongsUUIDs;
//   }
// }

export class User {
  uuid: string;
  login: string;
  password?: string;
  roles: string[];
  isAccountNonLocked?: boolean;
  isActive?: boolean;
  description?: string;
  imgFileUUID?: string;
  phoneNumber?: string;
  email?: string;
  birthDate?: string;
  createdAt?: string;
  updatedAt?: string;
  urlImage?: string;
  lastVisitDate?: string;
  avgRating?: number;
  savedSongsUUIDs?: string[];

  constructor(props: {
    uuid: string;
    login: string;
    password?: string;
    roles: string[];
    isAccountNonLocked?: boolean;
    isActive?: boolean;
    description?: string;
    imgFileUUID?: string;
      urlImage?: string;
    phoneNumber?: string;
    email?: string;
    birthDate?: string;
    createdAt?: string;
    updatedAt?: string;
    lastVisitDate?: string;
    avgRating?: number;
    savedSongsUUIDs?: string[];
  }) {
    this.uuid = props.uuid;
    this.login = props.login;
    this.password = props.password;
    this.roles = props.roles;
    this.isAccountNonLocked = props.isAccountNonLocked ?? true;
    this.isActive = props.isActive ?? true;
    this.description = props.description;
    this.imgFileUUID = props.imgFileUUID;
    this.phoneNumber = props.phoneNumber;
    this.email = props.email;
        this.urlImage = props.urlImage;
    this.birthDate = props.birthDate;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.lastVisitDate = props.lastVisitDate;
    this.avgRating = props.avgRating;
    this.savedSongsUUIDs = props.savedSongsUUIDs;
  }
}
// SONG
export class Song {
  uuid: string;
  name: string;
  avgRating: number;
  url: string;
  status: SongStatus;
  urlImage?: string;
  authorUUID: string;
  tags: Tag[];
  fileUUID: string;
   createdAt?: string;

  constructor(props: {
    uuid: string;
    name: string;
    avgRating: number;
    url: string;
      urlImage?: string;
       createdAt?: string;

    status: SongStatus;
    authorUUID: string;
    tags: Tag[];
    fileUUID: string;
  }) {
    this.uuid = props.uuid;
    this.name = props.name;
    this.avgRating = props.avgRating;
    this.url = props.url;
    this.status = props.status;
        this.urlImage = props.urlImage;
    this.authorUUID = props.authorUUID;
    this.tags = props.tags;
    this.fileUUID = props.fileUUID;
        this.createdAt = props.createdAt;

  }
};

// PROMOTION REQUEST
export class PromotionRequest {
  uuid: string;
  songUUID: string;
  msg: string;
  fileUUID: string;
  dispatchTime: string;
  confirmationTime?: string;
  status: PromotionStatus;
  urlImg: string;

  constructor(props: {
      uuid: string;
      songUUID: string;
      msg: string;
       fileUUID: string;
      dispatchTime: string;
        urlImg: string;
      confirmationTime?: string;
      status: PromotionStatus;
  }) {
      this.uuid = props.uuid;
      this.songUUID = props.songUUID;
      this.msg = props.msg;
        this.fileUUID = props.fileUUID;
                this.urlImg = props.urlImg;
      this.dispatchTime = props.dispatchTime;
      this.confirmationTime = props.confirmationTime;
      this.status = props.status;
  }
}

// COOPERATION REQUEST
export class CooperationRequest {
  uuid: string;
  msg: string;
  dispatchTime: string;
  status: CooperationStatus;
  authorUUID: string;
  labelUUID: string;

  constructor(props: {
      uuid: string;
      msg: string;
      dispatchTime: string;
      status: CooperationStatus;
      authorUUID: string;
      labelUUID: string;
  }) {
      this.uuid = props.uuid;
      this.msg = props.msg;
      this.dispatchTime = props.dispatchTime;
      this.status = props.status;
      this.authorUUID = props.authorUUID;
      this.labelUUID = props.labelUUID;
  }
}

//ALBUM
export class Album {
  uuid: string;
  name: string;
  urlImage?: string;
  fileUuid: string;
  authorUUID: string;
  savedSongsUUIDs: string[];
  createdAt?:string;

  constructor(props: {
      uuid: string;
      name: string;
      authorUUID: string;
        fileUuid: string;
            urlImage?: string;
              createdAt?:string;

      savedSongsUUIDs: string[];
  }) {
      this.uuid = props.uuid;
      this.name = props.name;
            this.fileUuid = props.fileUuid;
         this.urlImage = props.urlImage;
      this.authorUUID = props.authorUUID;
            this.createdAt = props.createdAt;

      this.savedSongsUUIDs = props.savedSongsUUIDs;
  }
}

//ENUMS
export enum SongStatus {
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  AWAITING = 'AWAITING'
}

export enum FileExtension {
  WAV = 'WAV',
  MP3 = 'MP3',
  JPEG = 'JPEG',
  JPG = 'JPG',
  PNG = 'PNG'
}

export enum FileType {
  SONG = 'SONG',
  IMAGE = 'IMAGE'
}

export enum PromotionStatus {
  AWAITING_PROMOTION = 'AWAITING_PROMOTION',
  PROMOTED = 'PROMOTED',
  PROCESSING = 'PROCESSING'
}

export enum CooperationStatus {
  AWAITING = 'AWAITING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// Auth
export class AuthData {
  username: string;
  password: string;

  constructor(props: {
    username: string;
    password: string;
  }) {
    this.username = props.username;
    this.password = props.password;
  }
};

export class Token {
  token: string;

  constructor(props: {
    token: string;
  }) {
    this.token = props.token;
  }
};

export interface IKeyToken {
  key: string;
}

// Tabs
export interface ITab {
  title: string;
  link: string;
};

export interface ILink {
  label: string;
  icon?: string;
};
