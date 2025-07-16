import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Sausages',
        description: 'Delicious grilled sausages'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Samosas',
        description: 'Crispy beef samosas'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Wraps',
        description: 'Tasty wraps with various fillings'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Combo Meals',
        description: 'Complete meal combinations'
      }
    })
  ]);

  // Create menu items
  const menuItems = await Promise.all([
    // Sausages
    prisma.menuItem.create({
      data: {
        name: 'Grilled Sausage',
        description: 'Premium grilled sausage with herbs',
        price: 15.99,
        image: '/hero-sausage.jpg',
        categoryId: categories[0].id
      }
    }),
    prisma.menuItem.create({
      data: {
        name: 'Sausage Goodness',
        description: 'Our signature sausage with special seasoning',
        price: 18.99,
        image: '/sausage-goodness.png',
        categoryId: categories[0].id
      }
    }),
    
    // Samosas
    prisma.menuItem.create({
      data: {
        name: 'Beef Samosas',
        description: 'Crispy pastries filled with seasoned beef',
        price: 12.99,
        image: '/beef-samosas.png',
        categoryId: categories[1].id
      }
    }),
    
    // Wraps
    prisma.menuItem.create({
      data: {
        name: 'Tasty Wraps',
        description: 'Fresh wraps with your choice of filling',
        price: 14.99,
        image: '/tasty-wraps.png',
        categoryId: categories[2].id
      }
    }),
    
    // Combo Meals
    prisma.menuItem.create({
      data: {
        name: 'Combo Meal',
        description: 'Complete meal with sausage, sides, and drink',
        price: 24.99,
        image: '/combo-meals.png',
        categoryId: categories[3].id
      }
    })
  ]);

  console.log('Database seeded successfully!');
  console.log(`Created ${categories.length} categories and ${menuItems.length} menu items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });