import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { SampleBestService } from './sample.serviceBestService';
import { User } from './entities/sample.entity'

@Module({
  imports:[User],
  controllers: [SampleController],
  providers: [
    {
      provide: 'SampleService',
      useClass: SampleBestService,
    },
    SampleService,
  ],
})
export class SampleModule {}
