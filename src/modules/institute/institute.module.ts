import { Module } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { InstituteSchema } from './schema/institute.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Institute',
        useFactory: () => {
          const schema = InstituteSchema;
          return schema;
        },
      },
    ])
  ],
  controllers: [InstituteController],
  providers: [InstituteService]
})
export class InstituteModule {}
