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
                url: 'http://localhost:6001',
                description: 'Development server'
            },
            {
                url: 'https://api.example.com',
                description: 'Production server'
            }
        ],
        paths: {
            '/api/v1/auth/signup': {
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
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'User registered successfully',
                                        data: {
                                            user: {
                                                id: 'uuid',
                                                name: 'John Doe',
                                                email: 'john@example.com',
                                                is_verified: false
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Email already exists',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/verify-otp': {
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
                    responses: {
                        '200': {
                            description: 'OTP verified successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'OTP verified successfully',
                                        data: {}
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid OTP or validation error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Invalid OTP',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/request-otp': {
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
                    responses: {
                        '200': {
                            description: 'OTP resent successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'OTP sent to your email',
                                        data: {}
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Invalid email address',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/signin': {
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
                    responses: {
                        '200': {
                            description: 'Login successful',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'Login successful',
                                        data: {
                                            user: {
                                                id: 'uuid',
                                                name: 'John Doe',
                                                email: 'john@example.com',
                                                is_verified: true
                                            },
                                            onboarding: {
                                                steps: [
                                                    {
                                                        onBoardingStep: 1,
                                                        value: "Fitness",
                                                        createdAt: "2024-01-01T00:00:00.000Z"
                                                    },
                                                    {
                                                        onBoardingStep: 2,
                                                        value: "automatic",
                                                        createdAt: "2024-01-01T00:00:00.000Z"
                                                    }
                                                ],
                                                isCompleted: false
                                            },
                                            accessToken: 'jwt-access-token'
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid credentials',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Invalid email or password',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/refresh': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Refresh access token',
                    description: 'Get new access token using refresh token',
                    requestBody: {
                        required: false,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/RefreshTokenRequest' },
                                example: {
                                    refreshToken: 'jwt-refresh-token'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Token refreshed successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'Token refreshed successfully',
                                        data: {
                                            accessToken: 'new-jwt-access-token',
                                            refreshToken: 'new-jwt-refresh-token'
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Refresh token is required',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Refresh token is required',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/logout': {
                post: {
                    tags: ['Authentication'],
                    summary: 'User logout',
                    description: 'Logout user and clear session cookies',
                    responses: {
                        '200': {
                            description: 'Logged out successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'Logged out successfully',
                                        data: {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/forgot-password': {
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
            '/api/v1/auth/reset-password': {
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
            '/api/v1/health': {
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
            },
            '/api/v1/onboarding/submit': {
                post: {
                    tags: ['Onboarding'],
                    summary: 'Submit onboarding step',
                    description: 'Submit a single step of the onboarding process for the authenticated user. Special behavior: When submitting step 2 with coachType="automatic", the system will automatically set default values for steps 3 (coachLook="male") and 4 (coachStyle="Motivational").',
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/OnboardingRequest' },
                                examples: {
                                    step1: {
                                        value: {
                                            onBoardingStep: 1,
                                            values: {
                                                focusArea: "Fitness"
                                            }
                                        },
                                        summary: "Step 1: Focus Area"
                                    },
                                    step2Automatic: {
                                        value: {
                                            onBoardingStep: 2,
                                            values: {
                                                coachType: "automatic"
                                            }
                                        },
                                        summary: "Step 2: Automatic Coach Selection (auto-fills steps 3 & 4)"
                                    },
                                    step2Manual: {
                                        value: {
                                            onBoardingStep: 2,
                                            values: {
                                                coachType: "manual"
                                            }
                                        },
                                        summary: "Step 2: Manual Coach Selection"
                                    },
                                    step3: {
                                        value: {
                                            onBoardingStep: 3,
                                            values: {
                                                coachLook: "male"
                                            }
                                        },
                                        summary: "Step 3: Coach Look"
                                    },
                                    step4: {
                                        value: {
                                            onBoardingStep: 4,
                                            values: {
                                                coachStyle: "Motivational"
                                            }
                                        },
                                        summary: "Step 4: Coach Style"
                                    },
                                    step5: {
                                        value: {
                                            onBoardingStep: 5,
                                            values: {
                                                gender: "male",
                                                ageRange: "26-35"
                                            }
                                        },
                                        summary: "Step 5: Personal Info"
                                    },
                                    step6: {
                                        value: {
                                            onBoardingStep: 6,
                                            values: {
                                                planType: "pro"
                                            }
                                        },
                                        summary: "Step 6: Plan Type"
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Onboarding step submitted successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    examples: {
                                        incomplete: {
                                            value: {
                                                success: true,
                                                message: 'Onboarding step submitted successfully',
                                                data: {
                                                    message: 'Onboarding step submitted successfully',
                                                    isOnBoardingCompleted: false
                                                }
                                            },
                                            summary: "Regular step submission"
                                        },
                                        automaticCoach: {
                                            value: {
                                                success: true,
                                                message: 'Onboarding steps submitted successfully',
                                                data: {
                                                    message: 'Onboarding steps submitted successfully',
                                                    isOnBoardingCompleted: false,
                                                    autoSelectedSteps: {
                                                        coachLook: "male",
                                                        coachStyle: "Motivational"
                                                    }
                                                }
                                            },
                                            summary: "Automatic coach selection (includes auto-filled steps)"
                                        },
                                        complete: {
                                            value: {
                                                success: true,
                                                message: 'Onboarding step submitted successfully',
                                                data: {
                                                    message: 'Onboarding step submitted successfully',
                                                    isOnBoardingCompleted: true
                                                }
                                            },
                                            summary: "Final step submission"
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid step or values',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    examples: {
                                        invalidStep: {
                                            value: {
                                                success: false,
                                                message: 'Invalid onboarding step',
                                                error: 'BAD_REQUEST'
                                            },
                                            summary: "Invalid step number"
                                        },
                                        invalidValues: {
                                            value: {
                                                success: false,
                                                message: 'Values must only contain allowed fields for the given onBoardingStep',
                                                error: 'BAD_REQUEST'
                                            },
                                            summary: "Invalid values for step"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/onboarding/': {
                get: {
                    tags: ['Onboarding'],
                    summary: "Get user's onboarding data",
                    description: 'Retrieve onboarding data for the authenticated user.',
                    security: [{ BearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'Onboarding data retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        data: {
                                            onboarding: {
                                                focusArea: 'Mindset',
                                                coachSelection: 'manual',
                                                coachAvatar: 'avatar2.png',
                                                coachStyle: 'Calm',
                                                ageRange: '36-45',
                                                gender: 'female',
                                                planType: 'free'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/onboarding/status': {
                get: {
                    tags: ['Onboarding'],
                    summary: 'Check onboarding status',
                    description: 'Check if the authenticated user has completed onboarding.',
                    security: [{ BearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'Onboarding status retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        data: {
                                            completed: true
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/checkins/': {
                post: {
                    tags: ['Checkins'],
                    summary: 'Check in for today',
                    description: 'Mark the authenticated user as checked in for today.',
                    security: [{ BearerAuth: [] }],
                    responses: {
                        '201': {
                            description: 'Checked in for today',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'Checked in for today',
                                        data: {
                                            date: '2024-06-19',
                                            status: 'checked-in'
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        },
                        '409': {
                            description: 'Already checked in',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Already checked in for today',
                                        error: 'CONFLICT'
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ['Checkins'],
                    summary: 'Get all checkins',
                    description: 'Retrieve all checkin records for the authenticated user.',
                    security: [{ BearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'All checkins retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        data: [
                                            { date: '2024-06-18', status: 'checked-in' },
                                            { date: '2024-06-19', status: 'checked-in' }
                                        ]
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/checkins/today': {
                get: {
                    tags: ['Checkins'],
                    summary: "Get today's checkin",
                    description: "Retrieve today's checkin record for the authenticated user.",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        '200': {
                            description: "Today's checkin retrieved successfully",
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        data: { date: '2024-06-19', status: 'checked-in' }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/mood/': {
                post: {
                    tags: ['Mood'],
                    summary: 'Set mood',
                    description: 'Set the mood for the authenticated user.',
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/MoodRequest' }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Mood set successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        message: 'Mood set successfully',
                                        data: {
                                            mood: 'Happy',
                                            note: 'Feeling great!',
                                            date: '2024-06-19'
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Mood is required',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'Mood is required',
                                        error: 'BAD_REQUEST'
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ['Mood'],
                    summary: 'Get mood',
                    description: 'Retrieve the mood for the authenticated user (optionally by date).',
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        {
                            in: 'query',
                            name: 'date',
                            schema: { type: 'string', format: 'date' },
                            required: false,
                            description: 'Date to filter mood (optional)'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Mood retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SuccessResponse' },
                                    example: {
                                        success: true,
                                        data: {
                                            mood: 'Calm',
                                            note: 'Relaxed day',
                                            date: '2024-06-18'
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'User not authenticated',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' },
                                    example: {
                                        success: false,
                                        message: 'User not authenticated',
                                        error: 'UNAUTHORIZED'
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
                OnboardingStep: {
                    type: 'object',
                    properties: {
                        onBoardingStep: {
                            type: 'number',
                            description: 'Step number in the onboarding process',
                            example: 1
                        },
                        value: {
                            type: 'string',
                            description: 'Value submitted for this step',
                            example: 'Fitness'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'When this step was completed'
                        }
                    }
                },
                OnboardingResponse: {
                    type: 'object',
                    properties: {
                        steps: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OnboardingStep'
                            },
                            description: 'Array of completed onboarding steps'
                        },
                        isCompleted: {
                            type: 'boolean',
                            description: 'Whether the onboarding process is complete'
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
                            description: 'Success message',
                            example: 'Operation completed successfully.'
                        },
                        data: {
                            type: 'object',
                            description: 'Response data',
                            example: { result: 'Sample data' }
                        }
                    },
                    example: {
                        success: true,
                        message: 'Operation completed successfully.',
                        data: { result: 'Sample data' }
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
                            description: 'Error message',
                            example: 'Something went wrong.'
                        },
                        error: {
                            type: 'string',
                            description: 'Error type',
                            example: 'BAD_REQUEST'
                        }
                    },
                    example: {
                        success: false,
                        message: 'Something went wrong.',
                        error: 'BAD_REQUEST'
                    }
                },
                OnboardingRequest: {
                    type: 'object',
                    required: ['onBoardingStep', 'values'],
                    properties: {
                        onBoardingStep: {
                            type: 'number',
                            description: 'Step number in the onboarding process (1-6)',
                            minimum: 1,
                            maximum: 6,
                            example: 1
                        },
                        values: {
                            type: 'object',
                            description: 'Values for the current step. The expected values depend on the step number:\n1: { focusArea: "Money" | "Fitness" | "Mindset" }\n2: { coachType: "automatic" | "manual" }\n3: { coachLook: "male" | "female" }\n4: { coachStyle: "Motivational" | "Calm and Supportive" | "Not Accountability" | "Not Sure" }\n5: { gender: string, ageRange: "18-25" | "26-35" | "36-45" | "46-55" | "55+" }\n6: { planType: "free" | "pro" }',
                            example: {
                                "focusArea": "Fitness"
                            }
                        }
                    }
                },
                MoodRequest: {
                    type: 'object',
                    required: ['mood'],
                    properties: {
                        mood: {
                            type: 'string',
                            enum: ['Happy', 'Stressed', 'Motivated', 'Sad', 'Anxious', 'Calm', 'Excited'],
                            description: 'Mood type'
                        },
                        note: {
                            type: 'string',
                            description: 'Optional note about the mood'
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            description: 'Date for the mood entry (optional)'
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