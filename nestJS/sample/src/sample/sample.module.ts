import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { SampleBestService } from './sample.serviceBestService';

@Module({
  controllers: [SampleController],
  providers: [{
    provide: 'SampleService',
    useClass: SampleBestService
  }],
})
export class SampleModule {}
