import { QueryContract } from './../contracts/query.contract';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';
import { CreateCreditCardContract } from 'src/modules/backoffice/contracts/customer/create-credit-card.contract';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/service/account.service';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { CustomerService } from 'src/modules/backoffice/service/customer.service';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { Result } from 'src/modules/backoffice/models/result.model';
import { User } from 'src/modules/backoffice/models/user.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { UpdateCustomerContract } from 'src/modules/backoffice/contracts/customer/update-customer.contract';

//localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService
  ) {}

  @Get()
  async getAll() {
    try {
      const customers = await this.customerService.findAll();
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível encontrar', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':document')
  async get(@Param('document') document) {
    try {
      const customer = await this.customerService.find(document);
      return new Result(null, true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível encontrar', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true)
      );
      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        [],
        null,
        null,
        null,
        user
      );
      const res = await this.customerService.create(customer);
      return new Result('Cliente criado com sucesso !', true, res, null);
    } catch (error) {
      //rollback;
      throw new HttpException(
        new Result(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(document, model);
      return new Result('Cliente alterado com sucesso !', true, model, null);
    } catch (error) {
      //rollback;
      throw new HttpException(
        new Result(
          'Não foi possível atualizar seu cadastro',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }
  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createCreditCard(
    @Param('document') document,
    @Body() model: CreditCard
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
      return new Result('Cartão adicionado!', true, model, null);
    } catch (error) {
      //rollback;
      throw new HttpException(
        new Result('Não foi possível adicionar seu cartão', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDto) {
    try {
      const customers = await this.customerService.query(model);
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível buscar', false, null, error),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return new Result('Cliente atualizado com sucesso !', true, body, null);
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return new Result('Cliente Removido com sucesso !', true, null, null);
  }
}
