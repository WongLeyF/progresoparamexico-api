import { Module } from '@nestjs/common';
import { AggressorService } from './aggressor.service';
import { AggressorController } from './aggressor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AggressorSchema } from './schema/aggresor.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Aggressor',
        useFactory: () => {
          const schema = AggressorSchema;
          return schema;
        },
      },
    ])
  ],
  controllers: [AggressorController],
  providers: [AggressorService]
})
export class AggressorModule {}
