import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>
  ) {}

  async create(data: Customer): Promise<Customer> {
    //criar um novo cliente
    const customer = new this.model(data);
    return await customer.save();
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model.find({}, 'name email document').sort('name').exec();
  }

  async find(document): Promise<Customer> {
    return await this.model.findOne({ document }).exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, { skip: model.skip, limit: model.take })
      .sort(model.sort)
      .exec();
  }

  async saveOrUpdateCreditCard(
    document: string,
    data: CreditCard
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      { $set: { card: data } },
      options
    );
  }
}
