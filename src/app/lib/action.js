"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

/**
  * This module contains server-side actions for user registration and product retrieval.
  * It includes:
  * - User registration with validation
  * - User retrieval by ID
  * - Product retrieval by search query and flavor
  * @module actions 
  * @author wign
  */

// Zod schema for validating register input
const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

/**
 * Server action to register a new user.
 *
 * @async
 * @function
 * @param {Object} formdata - The user registration data from client.
 * @param {string} formdata.name - User's full name.
 * @param {string} formdata.email - User's email address.
 * @param {string} formdata.password - User's plain text password.
 * @returns {Promise<Object>} Result object with success status and message or error details.
 */
export const register = async (formdata) => {
  const result = registerSchema.safeParse(formdata);

  if (!result.success) {
    return {
      success: false,
      errorType: "VALIDATION_ERROR",
      message: result.error.flatten().fieldErrors,
    };
  }

  try {
    const { password, ...data } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isExist = await prisma.user.count({ where: { email: data.email } });

    if (isExist > 0) {
      return {
        success: false,
        errorType: "DUPLICATE_USER",
        message: "Email sudah digunakan",
      };
    }

    await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User berhasil dibuat",
    };
  } catch (error) {
    console.error("Server error saat register:", error);
    return {
      success: false,
      errorType: "SERVER_ERROR",
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
};

/**
 * Retrieves a user by their unique ID.
 *
 * @async
 * @function
 * @param {number|string} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} User data object if found, otherwise null.
 * @throws Will throw an error if database query fails.
 */

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

/**
 * Retrieves products filtered by search query and flavor.
 *
 * @async
 * @function
 * @param {string} [query] - Search string to match product names.
 * @param {string} [flavor] - Optional flavor filter.
 * @returns {Promise<Array>} List of matching products.
 * @throws Will throw an error if database query fails.
 */

export const getProductByQuery = async (query, flavor) => {
  try {
    const where = {};

    if (flavor) {
      where.flavor = flavor;
    }

    if (query) {
      where.name = {
        contains: query,
        mode: "insensitive",
      };
    }

    const products = await prisma.product.findMany({ where });

    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};


export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}