"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";


//zod for validation 
const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
/*
user server is declared this file is server component for server action
this file is used for server action like add to chart, login, register, etc
*/

/**
 * Server action untuk register user
 * @param {FormData} formdata - data dari form register (client)
 */

export const resgiter = async (formdata) => {
  const result = registerSchema.safeParse(formdata);

  //validation zod
  if (!result.success) {
    return {
      success: false,
      message: data.error.flatten().fieldErrors,
    };
  }
  try {
    //desructuring data for get password
    const { password, ...data } = result.data;

    //and password will hash using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if user already exists
    const isExist = await prisma.user.count({
      where: {
        email: data.email,
      },
    });

    //if user already exists, return error
    if (isExist > 0) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    //store user to database
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    //check if user created successfully
    //if user not created, return error
    if (!user) {
      return {
        success: false,
        message: "User not created",
      };
    }

    //if use created successfully, return success
    return {
      success: true,
      message: "User created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
