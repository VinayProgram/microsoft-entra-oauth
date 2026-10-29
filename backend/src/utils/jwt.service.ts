import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generate a signed JWT session token for your frontend
   */
  generateSessionToken(payload: { sub: string; access_token: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'your-super-secure-secret-key',
      expiresIn: '1h',
    });
  }

  /**
   * Verify an incoming token (e.g., from an httpOnly cookie in a Guard)
   */
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'your-super-secure-secret-key',
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Decode token payload without verifying signature (useful for inspection)
   */
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}