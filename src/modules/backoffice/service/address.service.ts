import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { AddressType } from '../enums/address-type.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>
  ) {}

  async create(
    document: string,
    data: Address,
    type: AddressType
  ): Promise<Customer> {
    const options = { upsert: true };
    if (type === AddressType.Billing) {
      return await this.model.findOneAndUpdate(
        { document },
        { $set: { billingAddress: data } },
        options
      );
    } else {
      return await this.model.findOneAndUpdate(
        { document },
        {
          $set: { shippingAddress: data }
        },
        options
      );
    }
  }

  //metodo sem enum
  // async addBillingAddress(document: string, data: Address): Promise<Customer> {
  //   //adicionar endereço de cobrança.
  //   const options = { upsert: true };

  //   return await this.model.findOneAndUpdate(
  //     { document },
  //     {
  //       $set: { billingAddress: data }
  //     },
  //     options
  //   );
  // }

  // async addShippingAddress(document: string, data: Address): Promise<Customer> {
  //   //adicionar endereço de entrega.
  //   const options = { upsert: true };

  //   return await this.model.findOneAndUpdate(
  //     { document },
  //     {
  //       $set: { shippingAddress: data }
  //     },
  //     options
  //   );
  // }
}
