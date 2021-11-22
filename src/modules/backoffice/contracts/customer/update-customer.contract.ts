import { UpdateCustomerDto } from './../../dtos/customer/update-customer.dto';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
export class UpdateCustomerContract implements Contract {
  errors: any[];
  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinlength(model.name, 5, 'Nome inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
