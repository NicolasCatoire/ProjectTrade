import { Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('trade/:id')
  async find(@Param('id') id: string, @Res() res) {
    const user = await this.usersService.findById(id);
    if (user) {
      return res.status(200).json(user)
    }
    else
      return res.status(404).json("NOT_FOUND")
  }

  @UseGuards(JwtAuthGuard)
  @Post('trade/create-profile')
  async createUser(@Request() req) {
    return await this.usersService.create(req.body)
  }
}