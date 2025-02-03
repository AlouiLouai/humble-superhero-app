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

  private humilityScoreMiddleware: Prisma.Middleware = async (
    params: Prisma.MiddlewareParams,
    next: (
      params: Prisma.MiddlewareParams,
    ) => Promise<Prisma.PrismaPromise<unknown>>,
  ): Promise<Prisma.PrismaPromise<unknown>> => {
    if (params.model === 'Superhero' && params.action === 'create') {
      const args = params.args as { data?: { humilityScore?: number } };

      if (args.data && typeof args.data.humilityScore === 'number') {
        if (args.data.humilityScore < 1 || args.data.humilityScore > 10) {
          throw new Error('humilityScore must be between 1 and 10');
        }
      }
    }

    return next(params);
  };
}
