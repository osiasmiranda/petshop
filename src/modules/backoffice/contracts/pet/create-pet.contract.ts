import { Injectable } from '@nestjs/common';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { Pet } from 'src/modules/backoffice/models/pet.model';

@Injectable()
export class CreatePetContract implements Contract {
  errors: any[];
  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinlength(model.name, 2, 'Nome inválido');
    flunt.hasMinlength(model.gender, 3, 'Gênero inválido');
    flunt.hasMinlength(model.kind, 2, 'Tipo inválido');
    flunt.hasMinlength(model.brand, 3, 'Raça inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
