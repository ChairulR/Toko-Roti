"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

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
        address: formdata.address || "",
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
                comments: true,
              },
            },
            comments: true,
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
      address: user.address,
      orders: user.orders.map((order) => ({
        id: order.id,
        status: order.status,
        qty: order.qty,
        payment: order.payment,
        orderType: order.orderType,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        comments: order.comments,
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
        id: id,
      },

      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                comments: true,
              },
            },
          },
        },
      },
    });
    const ratings = product.comments.map((c) => c.rate);
    const totalRating = ratings.reduce((sum, r) => sum + r, 0);
    const averageRating = ratings.length
      ? (totalRating / ratings.length).toFixed(1)
      : null;
    const reviewCount = ratings.length;

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
        averageRating,
        reviewCount,
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
        id: parseInt(orderId, 10),
        userId: userId,
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
        comments: {
          select: {
            id: true,
            content: true,
            rate: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
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
          flavor: order.product.flavor,
        },
        user: {
          id: order.user.id,
          name: order.user.name,
        },
        comments: order.comments,
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


export const createComment = async (productId, userId, rate, orderId ,comment) => {
  try {
    const ratingValue = rate;
    if (ratingValue < 1 || ratingValue > 5) {
      return { success: false, message: "Rating harus antara 1 hingga 5" };
    }

    if (!comment || comment.length > 500) {
      return {
        success: false,
        message: "Komentar harus diisi dan maksimal 500 karakter",
      };
    }

    const newComment = await prisma.comment.create({
      data: {
        productId: productId,
        userId: userId,
        rate: ratingValue,
        orderId: orderId,
        content: comment,
      },
    });

    await prisma.order.updateMany({
      where: {
        productId,
        userId,
      },
      data: {
        rating: ratingValue,
        notes: comment,
      },
    });

    return {
      success: true,
      message: "Komentar berhasil ditambahkan",
      data: {
        id: newComment.id,
        userId: newComment.userId,
        rate: newComment.rate,
        comment: newComment.content,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menyimpan komentar",
    };
  }
};

export const createOrder = async (userId, productId, qty, paymentMethod, orderType) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: userId,
        productId: productId,
        qty: qty,
        status: "PURCHASED",
        payment: paymentMethod,
        orderType: orderType,
      },
    });

    return {
      success: true,
      message: "Order berhasil dibuat",
      data: order,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message: "Terjadi kesalahan dalam pemesanan",
    };
  }
};

export const updateProfile = async ({ name, address, password }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const data = {
    name,
    address,
  };

  if (password && password.length >= 8) {
    data.password = await bcrypt.hash(password, 10);
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    return { success: true, message: "Profil berhasil diperbarui" };
  } catch (err) {
    console.error("Update profile error:", err);
    return { success: false, message: "Gagal memperbarui profil" };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    if (!orderId) {
      return { success: false, message: "Order ID diperlukan" };
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    return { success: true, message: "Pesanan berhasil dibatalkan", data: order };
  } catch (error) {
    console.error("Error cancelling order:", error);
    return { success: false, message: "Terjadi kesalahan saat membatalkan pesanan" };
  }
};
