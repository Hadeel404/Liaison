import express from 'express';
import { NSUser } from '../../@types/user.type.js';

const authorize = (api: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const permissions: any[] = res.locals.user?.roles?.reduce((acc: any[], cur: { permissions: any; })=>{
      acc=[...acc, ...cur.permissions];
      return acc
    }, []);
    if (permissions.filter(p => p.permissionName === api).length > 0) {
      next();
    } else {
      res.status(403).send("You don't have the permission to access this resource!");
    }
  }
}

export {
  authorize
}