import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const PasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/forgot', forgotPasswordController.create);
PasswordRouter.post('/reset', resetPasswordController.create);

export default PasswordRouter;
