import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  
  /**
   * Fetch user profile from Microsoft Graph API using the Access Token
   */
  async getUserByAccessToken(accessToken: string) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new UnauthorizedException('Microsoft access token is expired or invalid');
        }
        throw new Error(`Microsoft Graph API error: ${response.statusText}`);
      }

      const microsoftUser = await response.json();

      // Map Microsoft Graph response to a clean user object
      return {
        id: microsoftUser.id,
        name: microsoftUser.displayName,
        email: microsoftUser.mail || microsoftUser.userPrincipalName,
        jobTitle: microsoftUser.jobTitle,
        officeLocation: microsoftUser.officeLocation,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user profile from Microsoft');
    }
  }

  getUsers() {
    // Existing method
  }
}