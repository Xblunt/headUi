// // ! MAIN

// export class Main {
//   teamTitle: string;
//   teamDescription: string;
//   staffs: MainStaff[];
//   companyTitle: string;
//   companies: MainCompany[];

//   constructor(props: {

//     teamTitle: string;
//     teamDescription: string;
//     staffs: MainStaff[];
//     companyTitle: string;
//     companies: MainCompany[];
//   }) {
//     this.teamTitle = props.teamTitle;
//     this.teamDescription = props.teamDescription;
//     this.staffs = props.staffs;
//     this.companyTitle = props.companyTitle;
//     this.companies = props.companies;
//   }
// };



// export class MainStaff {
//   id?: number;
//   username: string;
//   job: string;
//   image: string;

//   constructor(props: {
//     id?: number;
//     username: string;
//     job: string;
//     image: string;
//   }) {
//     this.id = props.id;
//     this.username = props.username;
//     this.job = props.job;
//     this.image = props.image;
//   }
// };

// export class MainCompany {
//   id?: number;
//   name?: string;
//   description: string;
//   image: string;
//   icon: string;

//   constructor(props: {
//     id?: number;
//     name?: string;
//     description: string;
//     image: string;
//     icon: string;
//   }) {
//     this.id = props.id;
//     this.name = props.name;
//     this.description = props.description;
//     this.image = props.image;
//     this.icon = props.icon;
//   }
// };

// // ! NEWS
// export class News {
//   id?: number;
//   title: string;
//   description: string;
//   fullDescription: string;
//   video: string;
//   image: string;
//   activity: boolean;
//   date: string;

//   constructor(props: {
//     id?: number;
//     title: string;
//     description: string;
//     fullDescription: string;
//     video: string;
//     image: string;
//     activity: boolean;
//     date: string;
//   }) {
//     this.id = props.id;
//     this.title = props.title;
//     this.description = props.description;
//     this.fullDescription = props.fullDescription;
//     this.video = props.video;
//     this.image = props.image;
//     this.activity = props.activity;
//     this.date = props.date;
//   }
// };

// // ! DIRECTIONS

// export class Direction {
//   id?: number;
//   title: string;
//   fullDescription: string;
//   shortDescription: string;
//   image: string;
//   path: string;
//   solutions: Solution[];

//   constructor(props: {
//     id?: number;
//     title: string;
//     fullDescription: string;
//     shortDescription: string;
//     image: string;
//     path: string;
//     solutions: Solution[];
//   }) {
//     this.id = props.id;
//     this.title = props.title;
//     this.fullDescription = props.fullDescription;
//     this.shortDescription = props.shortDescription;
//     this.image = props.image;
//     this.path = props.path;
//     this.solutions = props.solutions;
//   }
// };

// export class Solution {
//   id?: number;
//   title: string;
//   description?: string;
//   rows: SubRow[];
//   additionalLicenseDescription?: string;
//   additionalLicenseRows?: SubRow[];

//   constructor(props: {
//     id?: number;
//     title: string;
//     description?: string;
//     rows: SubRow[];
//     additionalLicenseDescription?: string;
//     additionalLicenseRows?: SubRow[];
//   }) {
//     this.id = props.id;
//     this.title = props.title;
//     this.description = props.description;
//     this.rows = props.rows;
//     this.additionalLicenseDescription = props.additionalLicenseDescription;
//     this.additionalLicenseRows = props.additionalLicenseRows;
//   }
// };

// export class SubRow {
//   id?: number;
//   name: string;
//   price?: number;
//   code?: string;
//   singleService: boolean;
//   variables?: SubRowVariables[];

//   constructor(props: {
//     id?: number;
//     name: string;
//     price?: number;
//     code?: string;
//     singleService: boolean;
//     variables?: SubRowVariables[];
//   }) {
//     this.id = props.id;
//     this.name = props.name;
//     this.price = props.price;
//     this.code = props.code;
//     this.singleService = props.singleService;
//     this.variables = props.variables;
//   }
// };

// export class SubRowVariables {
//   id?: number;
//   code: string;
//   price: number;
//   quantity: number;

//   constructor(props: {
//     id?: number;
//     code: string;
//     price: number;
//     quantity: number;
//   }) {
//     this.id = props.id;
//     this.code = props.code;
//     this.price = props.price;
//     this.quantity = props.quantity;
//   }
// };

// // ! CAREER

// export class Career {
//   id?: number;
//   title: string;
//   image: string;
//   description: string;

//   constructor(props: {
//     id?: number;
//     title: string;
//     image: string;
//     description: string;
//   }) {
//     this.id = props.id;
//     this.title = props.title;
//     this.image = props.image;
//     this.description = props.description;
//   }
// };

// // ! ABOUT

// export class About {
//   title: string;
//   description: string;
//   video: string;
//   image: string;
//   missionTitle: string;
//   missionDescription: string;
//   missionImage: string;
//   statusTitle: string;
//   statusImage: string;
//   status: string[];
//   principleTitle: string;
//   principles: AboutPrinciple[];
//   offerTitle: string;
//   offerDescription: string;
//   offerImage: string;

//   constructor(props: {
//     title: string;
//     description: string;
//     video: string;
//     image: string;
//     missionTitle: string;
//     missionDescription: string;
//     missionImage: string;
//     statusTitle: string;
//     statusImage: string;
//     status: string[];
//     principleTitle: string;
//     principles: AboutPrinciple[];
//     offerTitle: string;
//     offerDescription: string;
//     offerImage: string;
//   }) {
//     this.title = props.title;
//     this.description = props.description;
//     this.video = props.video;
//     this.image = props.image;
//     this.missionTitle = props.missionTitle;
//     this.missionDescription = props.missionDescription;
//     this.missionImage = props.missionImage;
//     this.statusTitle = props.statusTitle;
//     this.statusImage = props.statusImage;
//     this.status = props.status;
//     this.principleTitle = props.principleTitle;
//     this.principles = props.principles;
//     this.offerTitle = props.offerTitle;
//     this.offerDescription = props.offerDescription;
//     this.offerImage = props.offerImage;
//   }
// };

// export class AboutPrinciple {
//   id?: number;
//   title: string;
//   icon: string;

//   constructor(props: {
//     id?: number;
//     title: string;
//     icon: string;
//   }) {
//     this.id = props.id;
//     this.title = props.title;
//     this.icon = props.icon;
//   }
// };

// // ! CONTACTS 

// export class Contacts {
//   title: string;
//   address: string;
//   coordinates: number[];
//   email: string;
//   phone: string;
//   tg?: string;
//   vk?: string;

//   constructor(props: {
//     title: string;
//     address: string;
//     coordinates: number[];
//     email: string;
//     phone: string;
//     tg?: string;
//     vk?: string;
//   }) {
//     this.title = props.title;
//     this.address = props.address;
//     this.coordinates = props.coordinates;
//     this.email = props.email;
//     this.phone = props.phone;
//     this.tg = props.tg;
//     this.vk = props.vk;
//   }
// };

// // ! Feedbacks

// export enum FeedbackTypes {
//   CONTACTS = 'Контакты',
//   DIRECTION = 'Направления',
//   CAREER = 'Вакансии',
// };

// export interface GeneralFeedback {
//   id?: number;
//   name: string;
//   email: string;
//   date: string;
//   accepted: boolean;
//   type: FeedbackTypes;
//   originalMessageText: string;
//   number: string;
//   topic?: string;
//   message?: string;
//   html?: string;
//   vacancy?: string;
// };

// export interface FeedbackContacts {
//   id: number;
//   name: string;
//   email: string;
//   number: string;
//   topic: string;
//   message: string;
//   date: string;
//   accepted: boolean;
// };

// export interface FeedbackDirection {
//   id: number;
//   name: string;
//   number: string;
//   email: string;
//   html: string;
//   date: string;
//   accepted: boolean;
// };

// export interface FeedbackCareer {
//   id: number;
//   name: string;
//   email: string;
//   number: string;
//   vacancy: string;
//   date: string;
//   accepted: boolean;
// };

// export interface FeedbackCareerFile {
//   file: File | null;
// };

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
  data: Uint8Array | number[];
  extension: FileExtension;
  type: FileType;

  constructor(props: {
    uuid: string;
    data: Uint8Array | number[];
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

export class User {
  uuid?: string;
  login?: string;
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
  lastVisitDate?: string;
  avgRating?: number;
  savedSongsUUIDs?: string[];

  constructor(props: {
    uuid: string;
    login: string;
    password: string;
    roles: string[];
    isAccountNonLocked: boolean;
    isActive: boolean;
    description: string;
    imgFileUUID: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    lastVisitDate: string;
    avgRating: number;
    savedSongsUUIDs: string[];
  }) {
    this.uuid = props.uuid;
    this.login = props.login;
    this.password = props.password;
    this.roles = props.roles;
    this.isAccountNonLocked = props.isAccountNonLocked;
    this.isActive = props.isActive;
    this.description = props.description;
    this.imgFileUUID = props.imgFileUUID;
    this.phoneNumber = props.phoneNumber;
    this.email = props.email;
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
  authorUUID: string;
  tags: Tag[];
  fileUUID: string;

  constructor(props: {
    uuid: string;
    name: string;
    avgRating: number;
    url: string;
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
    this.authorUUID = props.authorUUID;
    this.tags = props.tags;
    this.fileUUID = props.fileUUID;
  }
};

// PROMOTION REQUEST
export class PromotionRequest {
  uuid: string;
  songUUID: string;
  msg: string;
  dispatchTime: string;
  confirmationTime?: string;
  status: PromotionStatus;

  constructor(props: {
      uuid: string;
      songUUID: string;
      msg: string;
      dispatchTime: string;
      confirmationTime?: string;
      status: PromotionStatus;
  }) {
      this.uuid = props.uuid;
      this.songUUID = props.songUUID;
      this.msg = props.msg;
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
  authorUUID: string;
  savedSongsUUIDs: string[];

  constructor(props: {
      uuid: string;
      name: string;
      authorUUID: string;
      savedSongsUUIDs: string[];
  }) {
      this.uuid = props.uuid;
      this.name = props.name;
      this.authorUUID = props.authorUUID;
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
  icon: string;
};

export interface ILink {
  label: string;
  icon?: string;
};
