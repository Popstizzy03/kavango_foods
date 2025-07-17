import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Sausages',
        description: 'Premium quality sausages grilled to perfection'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Wraps',
        description: 'Flavorful fillings wrapped in soft tortillas'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Samosas',
        description: 'Crispy pastry filled with spiced beef'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Combos',
        description: 'Perfect combinations for any appetite'
      }
    })
  ]);

  // Create menu items
  const menuItemsData = [
    // Sausages
    {
      name: 'Classic Beef Sausage',
      description: 'Premium beef sausage with our signature spice blend',
      price: 15.00,
      image: '/sausage-goodness.png',
      categoryId: categories[0].id
    },
    {
      name: 'Spicy Beef Sausage',
      description: 'Our classic beef sausage with an extra kick of spice',
      price: 15.00,
      image: '/sausage-goodness.png',
      categoryId: categories[0].id
    },
    {
      name: 'Chicken Sausage',
      description: 'Lean chicken sausage with herbs and light seasoning',
      price: 15.00,
      image: '/sausage-goodness.png',
      categoryId: categories[0].id
    },
    // Wraps
    {
      name: 'New Flava Wrap',
      description: 'Our newest wrap with chicken, veggies and special sauce',
      price: 35.00,
      image: '/tasty-wraps.png',
      categoryId: categories[1].id
    },
    {
      name: 'Beef Wrap',
      description: 'Tender beef strips with fresh vegetables and our signature sauce',
      price: 40.00,
      image: '/tasty-wraps.png',
      categoryId: categories[1].id
    },
    {
      name: 'Veggie Wrap',
      description: 'A delicious mix of grilled vegetables with our homemade dressing',
      price: 30.00,
      image: '/tasty-wraps.png',
      categoryId: categories[1].id
    },
    // Samosas
    {
      name: 'Beef Samosa (3 pcs)',
      description: 'Crispy triangular pastry filled with spiced minced beef',
      price: 25.00,
      image: '/beef-samosas.png',
      categoryId: categories[2].id
    },
    {
      name: 'Beef Samosa (5 pcs)',
      description: 'Crispy triangular pastry filled with spiced minced beef',
      price: 40.00,
      image: '/beef-samosas.png',
      categoryId: categories[2].id
    },
    {
      name: 'Beef Samosa (10 pcs)',
      description: 'Crispy triangular pastry filled with spiced minced beef',
      price: 75.00,
      image: '/beef-samosas.png',
      categoryId: categories[2].id
    },
    // Combos
    {
      name: '4D Savage Combo',
      description: 'Includes 10 sausage rolls, 10 spring rolls, 10 beef samosas, and 10 shawarma halves',
      price: 120.00,
      image: '/combo-meals.png',
      categoryId: categories[3].id
    },
    {
      name: 'Family Feast',
      description: 'A selection of our most popular items perfect for sharing with 4-6 people',
      price: 200.00,
      image: '/combo-meals.png',
      categoryId: categories[3].id
    },
    {
      name: 'Duo Delight',
      description: 'Perfect meal for two: 2 wraps, 4 sausages, and 2 drinks',
      price: 90.00,
      image: '/combo-meals.png',
      categoryId: categories[3].id
    }
  ];

  const menuItems = [];
  for (const item of menuItemsData) {
    const menuItem = await prisma.menuItem.create({
      data: item
    });
    menuItems.push(menuItem);
  }

  console.log('Database seeded successfully!');
  console.log(`Created ${categories.length} categories and ${menuItems.length} menu items.`);
  console.log('\nCategories created:');
  categories.forEach(cat => console.log(`- ${cat.name}: ${cat.description}`));
  console.log('\nSample menu items:');
  menuItems.slice(0, 5).forEach(item => console.log(`- ${item.name}: K${item.price}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });