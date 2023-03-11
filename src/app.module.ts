import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
import { ColumnModule } from './column/column.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { RowModule } from './row/row.module';
import { TableModule } from './table/table.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
        // todo add auth for subscriptions
        // 'graphql-ws': {
        //   onConnect: (connectionParams: any, websocket: any, context: any) => {
        //     // onConnect: (context: Context<any>)
        //     // const { connectionParams, extra } = context;
        //     // extra.user = { user: {} };
        //     const token = connectionParams.Authorization;
        //     if (token) {
        //       const user = authService.validateToken(token);
        //       return { user };
        //     }
        //     throw new Error('Missing auth token!');
        //   },
        // },
      },
    }),
    UsersModule,
    PubsubModule,
    TableModule,
    RowModule,
    ColumnModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppResolver, AuthResolver],
})
export class AppModule {}
