
export namespace NSUser {
  export enum Type {
    admin='admin' ,
    editor= 'editor' ,
    contributor= 'contributor'
  }

  export interface Item {
    id: number;
    firstName: string;
    lasstName: string;
    email: string;
    password: string;
    type: Type;
    createdAt: Date;
  }

  export interface Role {
    id: number;
    name: string;
    permissions: number[];
  }
  
  export interface Permission {
    id: number;
    name: string;
  }
}