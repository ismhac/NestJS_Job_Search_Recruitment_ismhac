import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { Public, ResponseMessage } from 'src/decorator/customize';


@ApiTags('APIs for Health Check')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }


    @Get()
    @Public()
    @HealthCheck()
    @ResponseMessage('Health check successfully')
    // swagger
    @ApiOperation({ summary: 'API health check' })
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ]);
    }
}
