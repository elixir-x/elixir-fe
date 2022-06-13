import { Request, Response } from 'express';

export interface RequestError {
    error: string,
    code?: number
}

export const sendError = (res: Response, error: RequestError) => res.status(error.code === undefined ? 200 : error.code).json(constructError(error));
export const sendSuccess = (res: Response, success: boolean) => res.json(constructSuccess(success));
export const sendData = (res: Response, data: any) => res.json(constructData(data));

export const constructSuccess = (success: boolean) => {
    return {
        success
    };
};

export const constructError = (error: RequestError) => {
    return {
        success: false,
        error: error.error
    };
};

export const constructData = (data: any) => {
    return {
        success: true,
        data
    }
}
