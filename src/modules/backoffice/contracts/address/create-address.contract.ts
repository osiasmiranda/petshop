import { Address } from 'src/modules/backoffice/models/address.model';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
export class CreateAddressContract implements Contract {
  errors: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();

    flunt.isFixedLength(model.zipCode, 8, 'CEP inválido');
    flunt.hasMinlength(model.street, 3, 'Rua inválida');
    flunt.hasMinlength(model.neighborhood, 3, 'Bairro inválida');
    flunt.hasMinlength(model.city, 3, 'Cidade inválida');
    flunt.isFixedLength(model.state, 2, 'Estado inválido');
    flunt.isFixedLength(model.country, 3, 'País inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
