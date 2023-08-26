import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { CreateUserDto } from "../dto/create-user.dto";
import { EditUserDto } from "../dto/edit-user.dto";

export const VALIDATION_ERROR = {
  error: "ValidationError",
  data: undefined,
  success: false,
};

export const USER_NOT_FOUND_ERROR = {
  error: "UserNotFound",
  data: undefined,
  success: false,
};

export const USER_EMAIL_EXISTS_ERROR = {
  error: "UserEmailAlreadyTaken",
  data: undefined,
  success: false,
};

export const USER_USERNAME_EXISTS_ERROR = {
  error: "UsernameAlreadyTaken",
  data: undefined,
  success: false,
};

class UserController {
  async createUser(req: Request, res: Response) {
    const { email, username, firstName, lastName } = req.body;

    if (!email) return res.status(400).json(VALIDATION_ERROR);
    if (!username) return res.status(400).json(VALIDATION_ERROR);

    const existingUserWithEmail = await AppDataSource.getRepository(
      User
    ).findOneBy({ email });
    const existingUserWithUsername = await AppDataSource.getRepository(
      User
    ).findOneBy({ username });

    if (existingUserWithEmail) {
      return res.status(409).json(USER_EMAIL_EXISTS_ERROR);
    }

    if (existingUserWithUsername) {
      return res.status(409).json(USER_USERNAME_EXISTS_ERROR);
    }

    try {
      const createUserDto: CreateUserDto = {
        email,
        username,
        firstName: firstName || "",
        lastName: lastName || "",
      };

      const newUser = AppDataSource.getRepository(User).create({
        ...createUserDto,
        password: "auto-gen-password",
      });

      const { id } = await AppDataSource.getRepository(User).save(newUser);

      res.status(201).json({
        error: undefined,
        data: { id, email, username, firstName, lastName },
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.userId as any;
    const { email, username, firstName, lastName } = req.body;

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId,
      });

      if (!user) return res.status(404).json(USER_NOT_FOUND_ERROR);

      if (email && email !== user.email) {
        const existingUserWithEmail = await AppDataSource.getRepository(
          User
        ).findOneBy({ email });

        if (existingUserWithEmail) {
          return res.status(409).json(USER_EMAIL_EXISTS_ERROR);
        }
      }

      if (username && username !== user.username) {
        const existingUserWithUsername = await AppDataSource.getRepository(
          User
        ).findOneBy({ username });

        if (existingUserWithUsername) {
          return res.status(409).json(USER_USERNAME_EXISTS_ERROR);
        }
      }

      const updateUserDto: EditUserDto = {
        email: email || user.email,
        username: username || user.username,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
      };

      AppDataSource.getRepository(User).update({ id: userId }, updateUserDto);

      res.status(201).json({
        error: undefined,
        data: { id: userId, email, username, firstName, lastName },
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const email: string = req.query.email as string;

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        email,
      });

      if (!user) return res.status(404).json(USER_NOT_FOUND_ERROR);

      const { id, username, firstName, lastName } = user;

      res.status(200).json({
        error: undefined,
        data: { id, email, username, firstName, lastName },
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await AppDataSource.getRepository(User).find();

      if (!users) return res.status(404).json({ error: "No users found" });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  }
}

export default new UserController();
