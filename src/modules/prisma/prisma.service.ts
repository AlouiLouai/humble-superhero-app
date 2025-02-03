import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // This method will be called when the module is initialized
  async onModuleInit() {
    await this.$connect();
    this.setupMiddleware(); // Call the middleware setup method
  }

  // This method will be called when the module is destroyed
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Separate function for setting up Prisma middleware
  private setupMiddleware() {
    this.$use(this.humilityScoreMiddleware);
  }

  // Middleware function for validating humilityScore
  private humilityScoreMiddleware: Prisma.Middleware = (params, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.model === 'Superhero' && params.action === 'create') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const data = params.args.data as { humilityScore: number };
      if (data.humilityScore < 1 || data.humilityScore > 10) {
        throw new Error('humilityScore must be between 1 and 10');
      }
    }
    // Proceed with the next Prisma query
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next(params);
  };
}
