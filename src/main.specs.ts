import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

jest.mock('@nestjs/swagger', () => ({
  DocumentBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    setVersion: jest.fn().mockReturnThis(),
    addBearerAuth: jest.fn().mockReturnThis(),
    addTag: jest.fn().mockReturnThis(),
    addServer: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({}),
  })),
  SwaggerModule: {
    createDocument: jest.fn(),
    setup: jest.fn(),
  },
}));

describe('Main bootstrap function', () => {
  let listenMock: jest.Mock;
  let appMock: any;

  beforeEach(() => {
    listenMock = jest.fn();
    appMock = {
      listen: listenMock,
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(appMock);
  });

  it('should create the application', async () => {
    const { bootstrap } = await import('./main');
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });

  //   it('should configure Swagger correctly', async () => {
  //     const { bootstrap } = await import('./main');
  //     await bootstrap();

  //     expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
  //       appMock,
  //       expect.any(Object),
  //     );
  //     expect(SwaggerModule.setup).toHaveBeenCalledWith(
  //       'api-docs',
  //       appMock,
  //       expect.any(Object),
  //     );
  //   });

  //   it('should start the server on the correct port and host', async () => {
  //     const { bootstrap } = await import('./main');
  //     await bootstrap();

  //     expect(listenMock).toHaveBeenCalledWith(3000, '0.0.0.0');
  //   });

  //   it('should configure the Swagger DocumentBuilder correctly', async () => {
  //     const { bootstrap } = await import('./main');
  //     await bootstrap();

  //     const mockDocumentBuilder = (DocumentBuilder as jest.Mock).mock
  //       .instances[0];

  //     expect(mockDocumentBuilder.setTitle).toHaveBeenCalledWith(
  //       'Lanchonete 5 amigos',
  //     );
  //     expect(mockDocumentBuilder.setDescription).toHaveBeenCalledWith(
  //       'Lanchonete de bairro',
  //     );
  //     expect(mockDocumentBuilder.setVersion).toHaveBeenCalledWith('1.0');
  //     expect(mockDocumentBuilder.addBearerAuth).toHaveBeenCalledWith(
  //       { type: 'apiKey', name: 'user', in: 'header' },
  //       'user',
  //     );
  //     expect(mockDocumentBuilder.addTag).toHaveBeenCalledWith('Lanchonete');
  //     expect(mockDocumentBuilder.addServer).toHaveBeenCalledWith(
  //       'http://localhost:3000',
  //     );
  //     expect(mockDocumentBuilder.addServer).toHaveBeenCalledWith(
  //       'https://b03e-2804-46ec-80d-b900-9a0e-646a-cf41-19e3.ngrok-free.app',
  //     );
  //     expect(mockDocumentBuilder.addServer).toHaveBeenCalledWith(
  //       'https://0oc9cpj3o6.execute-api.us-east-1.amazonaws.com/dev',
  //     );
  //   });
});
