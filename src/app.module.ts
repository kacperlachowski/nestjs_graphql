import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { PubsubModule } from './pubsub/pubsub.module';
import { TableModule } from './table/table.module';
import { RowModule } from './row/row.module';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PubsubModule,
    TableModule,
    RowModule,
    ColumnModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
