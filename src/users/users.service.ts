import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
  mobileNo: string;
  consent_status: boolean;
};

type ExcludePassword = {
  password: never;
};

type SafeUser = User & ExcludePassword;
// type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      mobileNo: '0826579970',
      consent_status: false,
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      mobileNo: '0826579990',
      consent_status: true,
    },
  ];

  async findById(id: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === id);
    delete user.password;
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findByMobileNo(mobileNo: string): Promise<User | undefined> {
    return this.users.find((user) => user.mobileNo === mobileNo);
  }
}
