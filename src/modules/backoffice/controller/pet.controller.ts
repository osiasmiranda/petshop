import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { CreatePetContract } from 'src/modules/backoffice/contracts/pet/create-pet.contract';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { PetService } from 'src/modules/backoffice/service/pet.service';
import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

//localhost:3000/v1/pets
@Controller('v1/pets')
export class PetController {
  constructor(private readonly service: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document, @Body() model: Pet) {
    try {
      await this.service.create(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar seu Pet', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document,
    @Param('id') id,
    @Body() model: Pet
  ) {
    try {
      await this.service.update(document, id, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar seu Pet', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
