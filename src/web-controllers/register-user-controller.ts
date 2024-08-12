import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports';
import { badRequest, created } from '@/web-controllers/util';
import { MissingParamError } from './errors';

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList;

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase;
  }  

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!(request.body.name) || !(request.body.email)) {
      let missingParam = !request.body.name ? 'name ' : '';
      missingParam += !request.body.email ? 'email' : '';
      return badRequest(new MissingParamError(missingParam.trim()));
    }

    const userData: UserData = request.body;
    const response = await this.usecase.RegisterUserOnMailingList(userData);

    if (response.isLeft()) {
      return badRequest(response.value);
    }
    else if (response.isRight()) {
      return created(response.value)
    }
  }
}