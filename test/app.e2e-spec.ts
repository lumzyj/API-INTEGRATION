import { 
  INestApplication, 
  ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; 
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';


describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = 
      await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe( {
      whitelist: true,
    }) 
    );
    await app.init()
    await app.listen(3344);

    prisma = app.get(PrismaService)
    // await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3344')
  });

  afterAll(() => {
    // app.close();
  })
 
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'lumina@gmail.com',
      password: 'Moyosore123',
      fullName: 'olumide',
      account: 1234567890,
      pin: 3023,
    }

    describe('Signup', () => {
      it('should throw if password empty', () =>{
        return pactum
        .spec()
        .post(
          '/auth/signup',
        ).withBody({
          email: dto.email,
          pin: dto.pin,
          fullNmae: dto.fullName
        })
        .expectStatus(400)
      })
      it('should throw if email empty', () =>{
        return pactum
        .spec()
        .post(
          '/auth/signup',
        ).withBody({
          password: dto.password,
          pin: dto.pin,
          fullNmae: dto.fullName
        })
        .expectStatus(400)
      })
      it('should signup', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup',
        ).withBody(dto)
        .expectStatus(201)
      })
    });

    describe('Signin', () => {
      // let access_token: string
      it('should throw if password empty', () =>{
        return pactum
        .spec()
        .post(
          '/auth/signin',
        ).withBody({
          email: dto.email,
          pin: dto.pin,
          fullNmae: dto.fullName
        })
        .expectStatus(400)
      })
      it('should throw if email empty', () =>{
        return pactum
        .spec()
        .post(
          '/auth/signin',
        ).withBody({
          password: dto.password,
          pin: dto.pin,
          fullNmae: dto.fullName
        })
        .expectStatus(400)
      })
      it('should signin', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin',
        ).withBody(dto)
        .expectStatus(201)
        .stores('userAt', 'access_token')
      })
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