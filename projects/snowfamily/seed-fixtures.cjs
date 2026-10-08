const path = require('path');
const { PrismaClient } = require(path.join(process.cwd(), 'node_modules/@prisma/client'));
const bcrypt = require(path.join(process.cwd(), 'node_modules/bcryptjs'));

async function seedSandbox() {
  const db = new PrismaClient();

  try {
    const password = await bcrypt.hash('sandbox-only-password', 10);
    const adminRoles = { set: [{ key: 'ADMIN' }] };

    await db.user.upsert({
      where: { username: 'sandbox-admin' },
      update: { password, roles: adminRoles },
      create: { username: 'sandbox-admin', password, roles: { connect: [{ key: 'ADMIN' }] } },
    });

    const qualification = await db.qualification.findFirst({ where: { sport: { key: 'ski' } } });
    if (!qualification) {
      throw new Error('Run the repository seed before sandbox fixtures');
    }

    let instructor = await db.instructor.findFirst({
      where: { firstName: 'Sandbox', lastName: 'Instructor' },
    });
    if (!instructor) {
      instructor = await db.instructor.create({
        data: {
          firstName: 'Sandbox',
          lastName: 'Instructor',
          qualifications: { connect: [{ id: qualification.id }] },
        },
      });
    }

    await db.user.upsert({
      where: { username: 'sandbox-instructor' },
      update: { password, instructorId: instructor.id },
      create: {
        username: 'sandbox-instructor',
        password,
        instructor: { connect: { id: instructor.id } },
        roles: { connect: [{ key: 'INSTRUCTOR' }] },
      },
    });

    const client = await db.client.upsert({
      where: { phone: '79990000001' },
      update: {},
      create: { phone: '79990000001', firstName: 'Sandbox', lastName: 'Client' },
    });

    for (const account of [
      { accountType: 'INSTRUCTOR', accountId: instructor.id },
      { accountType: 'CLIENT', accountId: client.id },
    ]) {
      await db.bankAccount.upsert({
        where: { accountType_accountId: account },
        update: {},
        create: { ...account, balance: 0 },
      });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const weekday = await db.typeDay.findUnique({ where: { key: 'weekday' } });

    for (let offset = 0; offset < 8; offset += 1) {
      const date = new Date(today);
      date.setUTCDate(date.getUTCDate() + offset);
      const startTime = new Date(date);
      startTime.setUTCHours(15);
      const endTime = new Date(date);
      endTime.setUTCHours(20);
      const schedule = await db.schedule.upsert({
        where: { date },
        update: {},
        create: { date, typeDayId: weekday.id, startTime, endTime },
      });
      const interval = await db.instructorSchedule.findFirst({
        where: { scheduleId: schedule.id, instructorId: instructor.id },
      });
      if (!interval) {
        await db.instructorSchedule.create({
          data: { scheduleId: schedule.id, instructorId: instructor.id, startTime, endTime },
        });
      }
    }

    const existingPrice = await db.price.findFirst({ where: { name: 'Sandbox test price' } });
    const endDate = new Date(today);
    endDate.setUTCDate(endDate.getUTCDate() + 30);
    if (existingPrice) {
      await db.price.update({ where: { id: existingPrice.id }, data: { startDate: today, endDate } });
    } else {
      await db.price.create({
        data: {
          name: 'Sandbox test price',
          startDate: today,
          endDate,
          sports: { connect: [{ key: 'ski' }, { key: 'snowboard' }] },
          items: { create: [{ duration: 1, numberClients: 1, pricePerHour: 2200, typeDayId: weekday.id }] },
        },
      });
    }

    console.log('Synthetic sandbox users, client, schedule and price are ready');
  } finally {
    await db.$disconnect();
  }
}

seedSandbox().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
