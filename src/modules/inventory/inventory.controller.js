import { getProducts, getProductById } from "./inventory.service.js";

export async function listProducts(req, res, next) {
  try {
    const products = await getProducts();
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
}

export async function detailProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}
