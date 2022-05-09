import { Module } from '@nestjs/common';
import { VictimService } from './victim.service';
import { VictimController } from './victim.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VictimSchema } from './schema/victim.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Victim',
        useFactory: () => {
          const schema = VictimSchema;
          return schema;
        },
      },
    ])
  ],
  controllers: [VictimController],
  providers: [VictimService]
})
export class VictimModule {}
