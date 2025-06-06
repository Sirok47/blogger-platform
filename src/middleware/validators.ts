import {body, param, ValidationError, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from "express";
import {APIErrorResult, FieldError} from "../models/error_models";

export const idValidation = param('id')
    .exists().withMessage('ID is required')
    .isString().withMessage('ID must be a string')
    .isLength({ min: 1 }).withMessage('ID must not be empty')
    .isNumeric().withMessage('ID must be a numeric string');

export const nameValidation = body('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 1 , max: 15}).withMessage('Name must not be longer than 15')

export const descriptionValidation = body('description')
    .exists().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 1 , max: 500}).withMessage('Description must not be longer than 500')

export const webUrlValidation = body('websiteUrl')
    .exists().withMessage('WebsiteUrl is required')
    .isString().withMessage('WebsiteUrl must be a string')
    .isLength({ min: 1 , max: 100}).withMessage('WebsiteUrl must not be longer than 100')
    .isURL().withMessage('WebsiteUrl is not a valid URL')

export const titleValidation = body('title')
    .exists().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 1 , max: 30}).withMessage('Title must must not be longer than 30')

export const shortDescValidation = body('shortDescription')
    .exists().withMessage('ShortDescription is required')
    .isString().withMessage('ShortDescription must be a string')
    .isLength({ min: 1 , max: 100}).withMessage('ShortDescription must not be longer than 100')

export const contentValidation = body('content')
    .exists().withMessage('Content is required')
    .isString().withMessage('Content must be a string')
    .isLength({ min: 1 , max: 1000}).withMessage('Content must not be longer than 1000')

export const blogIdValidation = body('blogId')
    .exists().withMessage('BlogId is required')
    .isString().withMessage('BlogId must be a string')
    .isLength({ min: 1 }).withMessage('BlogId must not be empty')

function formatErrors(error: ValidationError) {
    if (error.type === "field") {
        const err: FieldError = {
            field: error.path,
            message: error.msg,
        }
        return err
    }
}

export const validationResultMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).formatWith(formatErrors).array({onlyFirstError: true});
    if (errors.length === 0) {
        next();
    }
    // @ts-ignore
    const errObj: APIErrorResult = {errorsMessages:errors}
    res.status(400).send(errObj);
}