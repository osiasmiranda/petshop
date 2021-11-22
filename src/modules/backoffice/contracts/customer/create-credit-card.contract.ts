import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { CreditCard } from '../../models/credit-card.model';
export class CreateCreditCardContract implements Contract {
  errors: any[];
  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinlength(model.holder, 5, 'Nome no cartão inválido');
    flunt.isFixedLength(model.number, 16, 'Número do cartão inválido');
    flunt.isFixedLength(
      model.expiration,
      4,
      'Data de expiração do cartão inválido'
    );

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
