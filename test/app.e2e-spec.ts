
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';


describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(5900);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:5900');
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'lumina@gmail.com',
      password: 'Moyosore123',
      fullName: 'olumide',
      account: 1234567890,
      pin: 3023,
    };

    describe('Signup', () => {
      it('should throw if password is empty', () => {
        return pactum.spec().post('/auth/signup').withBody({
          email: dto.email,
          pin: dto.pin,
          fullName: dto.fullName,
        }).expectStatus(400);
      });

      it('should throw if email is empty', () => {
        return pactum.spec().post('/auth/signup').withBody({
          password: dto.password,
          pin: dto.pin,
          fullName: dto.fullName,
        }).expectStatus(400);
      });

      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if password is empty', () => {
        return pactum.spec().post('/auth/signin').withBody({
          email: dto.email,
          pin: dto.pin,
          fullName: dto.fullName,
        }).expectStatus(400);
      });

      it('should throw if email is empty', () => {
        return pactum.spec().post('/auth/signin').withBody({
          password: dto.password,
          pin: dto.pin,
          fullName: dto.fullName,
        }).expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
    });

    describe('Signout', () => {
      it('should signout', () => {
        return pactum
          .spec()
          .post('/auth/signout')
          .expectStatus(200);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .inspect();
      })
    });

    describe('Edit user', () => {
      it('should edit users', () => {
        const dto: EditUserDto = {
          fullName: "Boluwatife",
          email: "lumzkid@gmail.com",
          pin: 1965,
          account: 2150291538,
        }
        return pactum
        .spec()
        .patch('/users')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .inspect();
      })
    })

    describe('Delete user', () => {
      it('should delete user', () => {
        const dto: EditUserDto = {
          fullName: "Boluwatife",
          email: "lumzkid@gmail.com",
          pin: 1965,
          account: 2150291538,
        }
        return pactum
        .spec()
        .delete('/users')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200);
      });
    })
  });

  describe('Account', () => {

    describe('Create account', () => {});

    describe('Get account', () => {});

    describe('Get account by id', () => {});

    describe('Edit account', () => {});

    describe('Delete account', () => {});
  });

  describe('Transaction', () => {});

});