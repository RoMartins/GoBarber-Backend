import { Router, Response, Request } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request: Request, response: Response) => {
  return response.json();
});

export default appointmentsRouter;
