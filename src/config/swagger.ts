import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description: 'A comprehensive authentication system with JWT tokens, OTP verification, and password management',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:6001/api/v1',
                description: 'Development server'
            },
            {
                url: 'https://api.example.com/api/v1',
                description: 'Production server'
            }
        ],
        paths: {
            '/auth/signup': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Register new user',
                    description: 'Create a new user account with email verification',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/SignupRequest'
                                },
                                example: {
                                    name: 'John Doe',
                                    email: 'john@example.com',
                                    password: 'SecurePass123!'
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'User registered successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/SuccessResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/auth/verify-otp': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Verify OTP',
                    description: 'Verify the OTP sent to user email during registration',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/VerifyOTPRequest'
                                },
                                example: {
                                    email: 'john@example.com',
                                    otp: '123456'
                                }
                            }
                        }
                    },
                    responses: {}
                }
            },
            '/auth/request-otp': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Resend OTP',
                    description: 'Resend OTP to user email address',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email'],
                                    properties: {
                                        email: {
                                            type: 'string',
                                            format: 'email',
                                            description: 'User email address'
                                        }
                                    }
                                },
                                example: {
                                    email: 'john@example.com'
                                }
                            }
                        }
                    },
                    responses: {}
                }
            },
            '/auth/signin': {
                post: {
                    tags: ['Authentication'],
                    summary: 'User signin',
                    description: 'Authenticate user and return access/refresh tokens',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/SigninRequest'
                                },
                                example: {
                                    email: 'john@example.com',
                                    password: 'SecurePass123!'
                                }
                            }
                        }
                    },
                    responses: {}
                }
            },
            '/auth/refresh': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Refresh access token',
                    description: 'Get new access token using refresh token',
                    requestBody: {
                        required: false,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/RefreshTokenRequest'
                                },
                                example: {
                                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Token refreshed successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/SuccessResponse'
                                    },
                                    example: {
                                        success: true,
                                        message: 'Token refreshed successfully',
                                        data: {
                                            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Refresh token required',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Invalid refresh token',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/auth/logout': {
                post: {
                    tags: ['Authentication'],
                    summary: 'User logout',
                    description: 'Logout user and clear session cookies',
                    responses: {
                        '200': {
                            description: 'Logged out successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/SuccessResponse'
                                    },
                                    example: {
                                        success: true,
                                        message: 'Logged out successfully'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/auth/forgot-password': {
                post: {
                    tags: ['Password Management'],
                    summary: 'Forgot password (Step 1)',
                    description: 'Verify OTP and get tokens for password reset',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ForgotPasswordRequest'
                                },
                                example: {
                                    email: 'john@example.com',
                                    otp: '123456'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OTP verified successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/SuccessResponse'
                                    },
                                    example: {
                                        success: true,
                                        message: 'OTP verified successfully. You can now reset your password.',
                                        data: {
                                            user: {
                                                id: 'd0e56a07-6e6d-45be-9e68-d8223de2a372',
                                                name: 'John Doe',
                                                email: 'john@example.com',
                                                is_verified: true
                                            },
                                            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid OTP or validation error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/auth/reset-password': {
                post: {
                    tags: ['Password Management'],
                    summary: 'Reset password (Step 2)',
                    description: 'Reset password using refresh token from Authorization header',
                    security: [
                        {
                            RefreshToken: []
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ResetPasswordRequest'
                                },
                                example: {
                                    newPassword: 'NewSecurePass123!',
                                    confirmPassword: 'NewSecurePass123!'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Password reset successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/SuccessResponse'
                                    },
                                    example: {
                                        success: true,
                                        message: 'Password reset successfully',
                                        data: {
                                            message: 'Password reset successfully',
                                            user: {
                                                id: 'd0e56a07-6e6d-45be-9e68-d8223de2a372',
                                                name: 'John Doe',
                                                email: 'john@example.com',
                                                is_verified: true,
                                                createdAt: '2024-01-01T00:00:00.000Z',
                                                updatedAt: '2024-01-01T00:00:00.000Z'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Invalid refresh token or missing authorization',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/health': {
                get: {
                    tags: ['System'],
                    summary: 'Health check',
                    description: 'Check the health status of the API and database connection',
                    responses: {
                        '200': {
                            description: 'API is healthy',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                example: 'healthy'
                                            },
                                            database: {
                                                type: 'string',
                                                example: 'connected'
                                            },
                                            timestamp: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-01-01T00:00:00.000Z'
                                            }
                                        }
                                    },
                                    example: {
                                        status: 'healthy',
                                        database: 'connected',
                                        timestamp: '2024-01-01T00:00:00.000Z'
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'API is unhealthy',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                example: 'unhealthy'
                                            },
                                            database: {
                                                type: 'string',
                                                example: 'disconnected'
                                            },
                                            timestamp: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-01-01T00:00:00.000Z'
                                            }
                                        }
                                    },
                                    example: {
                                        status: 'unhealthy',
                                        database: 'disconnected',
                                        timestamp: '2024-01-01T00:00:00.000Z'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Access Token for API authentication'
                },
                RefreshToken: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Refresh Token for getting new access tokens'
                },
                CookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'accessToken',
                    description: 'Access token stored in HTTP-only cookie'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Unique user identifier'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        is_verified: {
                            type: 'boolean',
                            description: 'Email verification status'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Account creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                SignupRequest: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 50,
                            pattern: '^[a-zA-Z\\s]*$',
                            description: 'User full name (letters and spaces only)'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Valid email address'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            maxLength: 50,
                            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$',
                            description: 'Strong password with uppercase, lowercase, number, and special character'
                        }
                    }
                },
                SigninRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        password: {
                            type: 'string',
                            description: 'User password'
                        }
                    }
                },
                VerifyOTPRequest: {
                    type: 'object',
                    required: ['email', 'otp'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        otp: {
                            type: 'string',
                            pattern: '^\\d{6}$',
                            description: '6-digit OTP code'
                        }
                    }
                },
                ForgotPasswordRequest: {
                    type: 'object',
                    required: ['email', 'otp'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        otp: {
                            type: 'string',
                            pattern: '^\\d{6}$',
                            description: '6-digit OTP code'
                        }
                    }
                },
                ResetPasswordRequest: {
                    type: 'object',
                    required: ['newPassword', 'confirmPassword'],
                    properties: {
                        newPassword: {
                            type: 'string',
                            minLength: 6,
                            maxLength: 50,
                            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$',
                            description: 'New strong password'
                        },
                        confirmPassword: {
                            type: 'string',
                            description: 'Password confirmation (must match newPassword)'
                        }
                    }
                },
                RefreshTokenRequest: {
                    type: 'object',
                    properties: {
                        refreshToken: {
                            type: 'string',
                            description: 'JWT refresh token (optional if using cookies)'
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            description: 'Success message'
                        },
                        data: {
                            type: 'object',
                            description: 'Response data'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        error: {
                            type: 'string',
                            description: 'Error type'
                        }
                    }
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/**/*.ts', './src/controller/**/*.ts']
};

export const specs = swaggerJsdoc(options); 