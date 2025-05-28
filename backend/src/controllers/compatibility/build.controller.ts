import { Body, Controller, Post } from '@nestjs/common';
import { CheckBuildDto } from 'src/dto/checkBuild.dto';
import { CompatibilityService } from 'src/services/compatibility.service';

@Controller('check')
export class BuildController {
  constructor(private readonly compatibilityService: CompatibilityService) {}

  @Post('build')
  async checkBuild(@Body() buildComponents: CheckBuildDto) {
    const componentsChecked =
      await this.compatibilityService.validateBuildData(buildComponents);
    const individualCompatibilityResponse =
      await this.compatibilityService.checkIndividualRules(componentsChecked);
    console.log(individualCompatibilityResponse);
    return individualCompatibilityResponse;
  }
}
