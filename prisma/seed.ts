import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const prisma = new PrismaClient();

const categories = [
  "Elektronik",
  "Pakaian",
  "Makanan",
  "Minuman",
  "Peralatan Rumah Tangga",
  "Alat Tulis",
];

const units = ["Pcs", "Box", "Kg", "Gram", "Liter", "Lusin", "Rim", "Set", "Unit"];

const products = [
  { sku: "ELK-001", name: "Televisi LED 32 Inch", category: "Elektronik", unit: "Unit", buyPrice: 2100000, sellPrice: 2599000, stock: 15 },
  { sku: "ELK-002", name: "Kipas Angin Berdiri", category: "Elektronik", unit: "Unit", buyPrice: 285000, sellPrice: 379000, stock: 42 },
  { sku: "ELK-003", name: "Rice Cooker 1.8 Liter", category: "Elektronik", unit: "Unit", buyPrice: 320000, sellPrice: 425000, stock: 30 },
  { sku: "ELK-004", name: "Setrika Listrik 350 Watt", category: "Elektronik", unit: "Pcs", buyPrice: 145000, sellPrice: 199000, stock: 55 },
  { sku: "ELK-005", name: "Blender 2 Liter", category: "Elektronik", unit: "Unit", buyPrice: 275000, sellPrice: 359000, stock: 28 },
  { sku: "PKN-001", name: "Kaos Polos Katun Combed 30s", category: "Pakaian", unit: "Pcs", buyPrice: 35000, sellPrice: 55000, stock: 240 },
  { sku: "PKN-002", name: "Kemeja Formal Lengan Panjang", category: "Pakaian", unit: "Pcs", buyPrice: 95000, sellPrice: 149000, stock: 120 },
  { sku: "PKN-003", name: "Celana Jeans Slim Fit", category: "Pakaian", unit: "Pcs", buyPrice: 135000, sellPrice: 199000, stock: 85 },
  { sku: "PKN-004", name: "Jaket Hoodie Fleece", category: "Pakaian", unit: "Pcs", buyPrice: 115000, sellPrice: 179000, stock: 60 },
  { sku: "MKN-001", name: "Beras Premium 5 Kg", category: "Makanan", unit: "Box", buyPrice: 62000, sellPrice: 72000, stock: 150 },
  { sku: "MKN-002", name: "Minyak Goreng 2 Liter", category: "Makanan", unit: "Pcs", buyPrice: 32000, sellPrice: 38500, stock: 200 },
  { sku: "MKN-003", name: "Gula Pasir 1 Kg", category: "Makanan", unit: "Kg", buyPrice: 14000, sellPrice: 17000, stock: 180 },
  { sku: "MKN-004", name: "Mie Instan Goreng", category: "Makanan", unit: "Lusin", buyPrice: 28000, sellPrice: 34000, stock: 320 },
  { sku: "MNM-001", name: "Air Mineral 600 ml", category: "Minuman", unit: "Box", buyPrice: 42000, sellPrice: 52000, stock: 260 },
  { sku: "MNM-002", name: "Kopi Bubuk Robusta 250 Gram", category: "Minuman", unit: "Gram", buyPrice: 22000, sellPrice: 30000, stock: 140 },
  { sku: "MNM-003", name: "Teh Celup 25 Kantong", category: "Minuman", unit: "Box", buyPrice: 9000, sellPrice: 13000, stock: 175 },
  { sku: "MNM-004", name: "Susu UHT Full Cream 1 Liter", category: "Minuman", unit: "Liter", buyPrice: 18000, sellPrice: 23500, stock: 160 },
  { sku: "PRT-001", name: "Sapu Lantai Plastik", category: "Peralatan Rumah Tangga", unit: "Pcs", buyPrice: 25000, sellPrice: 38000, stock: 90 },
  { sku: "PRT-002", name: "Ember Plastik 20 Liter", category: "Peralatan Rumah Tangga", unit: "Pcs", buyPrice: 28000, sellPrice: 42000, stock: 70 },
  { sku: "PRT-003", name: "Rak Piring Stainless", category: "Peralatan Rumah Tangga", unit: "Set", buyPrice: 85000, sellPrice: 125000, stock: 35 },
  { sku: "ALT-001", name: "Buku Tulis 58 Lembar", category: "Alat Tulis", unit: "Lusin", buyPrice: 36000, sellPrice: 48000, stock: 210 },
  { sku: "ALT-002", name: "Pulpen Gel Hitam", category: "Alat Tulis", unit: "Box", buyPrice: 45000, sellPrice: 60000, stock: 130 },
  { sku: "ALT-003", name: "Kertas HVS A4 80 Gram", category: "Alat Tulis", unit: "Rim", buyPrice: 52000, sellPrice: 65000, stock: 95 },
];

async function main() {
  const categoryMap = new Map<string, number>();
  for (const name of categories) {
    const existing = await prisma.category.findFirst({ where: { name } });
    const category = existing ?? (await prisma.category.create({ data: { name } }));
    categoryMap.set(name, category.id);
  }

  const unitMap = new Map<string, number>();
  for (const name of units) {
    const existing = await prisma.unit.findFirst({ where: { name } });
    const unit = existing ?? (await prisma.unit.create({ data: { name } }));
    unitMap.set(name, unit.id);
  }

  for (const product of products) {
    const { category, unit, ...data } = product;
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        ...data,
        categoryId: categoryMap.get(category)!,
        unitId: unitMap.get(unit)!,
      },
      create: {
        ...data,
        categoryId: categoryMap.get(category)!,
        unitId: unitMap.get(unit)!,
      },
    });
  }

  console.log(
    `Seed selesai: ${categories.length} kategori, ${units.length} satuan, ${products.length} produk.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
