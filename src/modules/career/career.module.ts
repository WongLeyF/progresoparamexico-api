import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerSchema } from './schema/career.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Career',
        useFactory: () => {
          const schema = CareerSchema;
          return schema;
        },
      },
    ])
  ],
  controllers: [CareerController],
  providers: [CareerService]
})
export class CareerModule {}
