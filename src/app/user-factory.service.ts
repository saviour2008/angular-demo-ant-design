import { NewUserService } from './new-user.service';
import { UserService } from './user.service';

export const UserServiceFactory = () => {

    return new NewUserService();

};
