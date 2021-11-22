import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { Flunt } from 'src/utils/flunt';
export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinlength(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.isFixedLength(model.document, 11, 'CPF inválido');
    flunt.hasMinlength(model.password, 6, 'Senha inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
