import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';
import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { AddressController } from 'src/modules/backoffice/controller/address.controller';
import { CustomerController } from 'src/modules/backoffice/controller/customer.controller';
import { PetController } from 'src/modules/backoffice/controller/pet.controller';
import { AccountService } from 'src/modules/backoffice/service/account.service';
import { AddressService } from 'src/modules/backoffice/service/address.service';
import { CustomerService } from 'src/modules/backoffice/service/customer.service';
import { PetService } from 'src/modules/backoffice/service/pet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [AddressController, CustomerController, PetController],
  providers: [AccountService, AddressService, CustomerService, PetService]
})
export class BackofficeModule {}
