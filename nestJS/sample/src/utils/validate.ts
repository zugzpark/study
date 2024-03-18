import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class Validate implements PipeTransform<any> {
  async transform(value: any, {metatype}: ArgumentMetadata) {
    if(!metatype || !this.toValidate(metatype)){
        return value;
    }
    //const object = plainToInstance(metatype,value);
    //const errors = await validate(object)
    
    // if(errors.length>0){
    //     throw new BadRequestException('validation failed!')
    // }
    return value;
  }

  private toValidate(metatype) : boolean {
    const types = [String, Boolean, Number , Array ,Object]
    return !types.includes(metatype)
  }
}

