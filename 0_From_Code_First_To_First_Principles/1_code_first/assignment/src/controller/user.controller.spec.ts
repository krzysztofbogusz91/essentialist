import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import UserController, {
  USER_NOT_FOUND_ERROR,
  VALIDATION_ERROR,
} from "./user.controller";
import { mock } from "node:test";

describe("UserController", () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should return 400 if email is not provided", async () => {
      mockRequest.body = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(VALIDATION_ERROR);
    });

    it("should return 201 with the created user if email is provided", async () => {
      const email = "test@example.com" + Math.random();
      const mockUser = {
        id: 1,
        email,
        username: "test" + Math.random(),
      };
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockReturnValue(mockUser),
        findOneBy: jest.fn().mockReturnValue(undefined),
      });

      mockRequest.body = { email, username: mockUser.username };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: undefined,
        data: {
          id: mockUser.id,
          email: mockUser.email,
          username: mockUser.username,
          firstName: undefined,
          lastName: undefined,
        },
        success: true,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const email = "test@example.com" + Math.random();
      const mockUser = {
        id: 1,
        email,
        username: "test" + Math.random(),
      };

      AppDataSource.getRepository = jest.fn().mockReturnValue({
        save: jest.fn().mockReturnValue(mockUser),
        findOneBy: jest.fn().mockReturnValue(undefined),
        create: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      });
      mockRequest.body = { email, username: mockUser.username };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error creating user",
      });
    });
  });

  describe("updateUser", () => {
    it("should return 404 if user is not found", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockReturnValue(undefined),
      });

      mockRequest.params = { userId: "1" };
      mockRequest.body = { firstName: "test", lastName: "test" };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(USER_NOT_FOUND_ERROR);
    });

    it("should update the user and return 200 if user is found", async () => {
      const mockUser = {
        email: "test@example.com",
        firstName: "test",
        lastName: "test",
        username: "test",
      };
      const { email, firstName, lastName, username } = mockUser;
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockReturnValue(mockUser),
        update: jest.fn().mockReturnValue(mockUser),
      });

      mockRequest.params = { userId: "1" };
      mockRequest.body = {
        firstName: "test",
        lastName: "test",
      };
      mockResponse.json = jest.fn();

      await UserController.updateUser(mockRequest, mockResponse);

      expect(AppDataSource.getRepository(User).update).toHaveBeenCalledWith(
        {
          id: mockRequest.params.userId,
        },
        { ...mockUser }
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: undefined,
        data: {
          id: mockRequest.params.userId,
          email: undefined,
          username: undefined,
          firstName,
          lastName,
        },
        success: true,
      });
    });

    it("should return 500 if an error occurs", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      });

      mockRequest.params = { userId: "1" };
      mockRequest.body = { email: "test@example.com" };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error updating user",
      });
    });
  });

  describe("getUserByEmail", () => {
    it("should return 404 if user is not found", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockReturnValue(undefined),
      });

      mockRequest.query = { email: "test@example.com" };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getUserByEmail(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(USER_NOT_FOUND_ERROR);
    });

    it("should return the user and 200 if user is found", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        firstName: "test",
        lastName: "test",
        username: "test",
      };
      const { id, email, firstName, lastName, username } = mockUser;
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockReturnValue(mockUser),
      });

      mockRequest.query = { email: "test@example.com" };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getUserByEmail(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: undefined,
        data: { id, email, username, firstName, lastName },
        success: true,
      });
    });

    it("should return 500 if an error occurs", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      });

      mockRequest.query = { email: "test@example.com" };
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getUserByEmail(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error fetching user",
      });
    });
  });

  describe("getAllUsers", () => {
    it("should return 404 if no users are found", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue(undefined),
      });

      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "No users found",
      });
    });

    it("should return all users and 200 if users are found", async () => {
      const mockUsers = [{ id: 1, email: "test@example.com" }];
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue(mockUsers),
      });

      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should return 500 if an error occurs", async () => {
      AppDataSource.getRepository = jest.fn().mockReturnValue({
        find: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      });

      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn();

      await UserController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error fetching user",
      });
    });
  });
});
