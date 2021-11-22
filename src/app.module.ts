import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://balta:balta7180@7180.qoxf7.mongodb.net/7180?retryWrites=true&w=majority'
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: '7180',
      entities: ['dist/**/*.entity{.ts,.js}'],
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private connection: Connection) {}
}

//npm install --save @nestjs/passport passport passport-http-bearer
