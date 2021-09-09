import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/controllers/ResetPasswordController';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
