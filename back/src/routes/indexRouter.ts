import { Router} from "express";
import usersRouter from './usersRouter';
import appointmentsRouter from './appointmentsRouter';


const router: Router = Router();

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);

export default router;