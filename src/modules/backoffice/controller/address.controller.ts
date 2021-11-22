import { AddressType } from 'src/modules/backoffice/enums/address-type.enum';
import { AddressService } from 'src/modules/backoffice/service/address.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { Address } from 'src/modules/backoffice/models/address.model';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';
import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

//localhost:3000/v1/addresses/12345678911/billing
@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.service.create(document, model, AddressType.Billing);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address
  ) {
    try {
      await this.service.create(document, model, AddressType.Shipping);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
