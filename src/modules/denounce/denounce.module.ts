import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DenounceController } from './denounce.controller';
import { DenounceService } from './denounce.service';
import { DenounceSchema } from './schemas/denounce.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Denounce',
        useFactory: () => {
          const schema = DenounceSchema;
          return schema;
        },
      },
    ])
  ],
  controllers: [DenounceController],
  providers: [DenounceService]
})
export class DenounceModule {}
