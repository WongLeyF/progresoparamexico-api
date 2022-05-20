import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsSchema } from './schemas/reports.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Reports',
        useFactory: () => {
          const schema = ReportsSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          schema.plugin(require('mongoose-aggregate-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
