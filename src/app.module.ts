import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DenounceModule } from './modules/denounce/denounce.module';
import { VictimModule } from './modules/victim/victim.module';
import { AggressorModule } from './modules/aggressor/aggressor.module';
import { ReportsModule } from './modules/reports/reports.module';
import { InstituteModule } from './modules/institute/institute.module';
import { CareerModule } from './modules/career/career.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://localhost:27017/${configService.get<string>('DB_NAME')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    DenounceModule,
    VictimModule,
    AggressorModule,
    ReportsModule,
    InstituteModule,
    CareerModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
