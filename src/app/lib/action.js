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
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
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
      include: {
        orders: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                flavor: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      orders: user.orders.map((order) => ({
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        product: {
          id: order.product.id,
          name: order.product.name,
          price: order.product.price,
          image: order.product.image,
          flavor: order.product.flavor,
        },
      })),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by ID:", error);
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

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      return {
        success: false,
        errorType: "NOT_FOUND",
        message: "Product not found",
      };
    }

    return {
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        flavor: product.flavor,
        comments: product.comments.map((comment) => ({
          id: comment.id,
          userId: comment.userId,
          name: comment.user.name,
          rate: comment.rate,
          comment: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getOrderById = async (orderId, userId) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
        userId: Number(userId),
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            flavor: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      return {
        status: false,
        data: null,
        message: "Order not found",
      };
    }

    return {
      status: true,
      data: {
        id: order.id,
        userId: order.userId,
        productId: order.productId,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        product: {
          id: order.product.id,
          name: order.product.name,
          image: order.product.image,
          price: order.product.price,
          image: order.product.image,
          flavor: order.product.flavor,
        },
        user: {
          id: order.user.id,
          name: order.user.name,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return {
      status: false,
      message:
        "Order not found or you do not have permission to view this order.",
    };
  }
};
