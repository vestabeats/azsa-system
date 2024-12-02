import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user'; 

interface DecodedToken extends JwtPayload {
  userId: string;
}

export interface CustomRequest extends Request {
  user?: {
    passportnumber?: string;
    isAdmin: boolean;
    isOfficials: boolean;
    userId: string;
  };
}

const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token = req.cookies?.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      const resp = await User.findById(decodedToken.userId).select('isAdmin passportnumber isOfficials');
      if (resp) {
        req.user = {
          passportnumber: resp.passportnumber,
          isAdmin: resp.isAdmin,
          isOfficials: resp.isOfficials,
          userId: decodedToken.userId
        };
        next();
      } else {
        res.status(401).json({ status: false, message: 'Not Authorized. Try Login Again' });
      }
    } else {
      res.status(401).json({ status: false, message: 'Not Authorized. Try Login Again' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: false, message: 'Not Authorized. Try Login Again' });
  }
};

const isAdminRoute = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      status: false,
      message: 'Not authorized as admin. Try login as admin.',
    });
  }
};

const isOfficialsRoute = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isOfficials) {
    next();
  } else {
    res.status(401).json({
      status: false,
      message: 'Not authorized as admin. Try login as admin.',
    });
  }
};

export { isAdminRoute, isOfficialsRoute, protectRoute };
