import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // --- SETTINGS ---
  const existingSettings = await prisma.settings.findFirst();
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        address: 'Bhiwandi, Maharashtra, India',
        phones: '["+91 9999999999"]',
        hours: 'Mon-Sat: 10:00 AM - 5:00 PM',
        principalName: 'John Doe',
        principalMessage: 'Welcome to Paradise English School. Our aim is to foster holistic growth in every child.',
        principalImage: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=800&auto=format&fit=crop',
      },
    });
    console.log('Created default settings.');
  }

  // --- FAQs ---
  const faqs = [
    {
      question: 'What is the admission procedure?',
      answer: 'The admission procedure involves filling out an enquiry form online, followed by a campus visit and an interaction session.',
      order: 1,
    },
    {
      question: 'Are books and bags provided for free?',
      answer: 'Yes, we provide free school books and bags for admissions in the 2026-27 academic year.',
      order: 2,
    },
    {
      question: 'Do you offer extracurricular activities?',
      answer: 'Absolutely. We offer sports, art & craft, music & dance, debate clubs, and science clubs.',
      order: 3,
    },
    {
      question: 'What are the school hours?',
      answer: 'The school operates from Monday to Saturday, 10:00 AM to 5:00 PM.',
      order: 4,
    },
  ];

  for (const faq of faqs) {
    const exists = await prisma.fAQItem.findFirst({
      where: { question: faq.question },
    });
    if (!exists) {
      await prisma.fAQItem.create({ data: faq });
    }
  }
  console.log('Seeded FAQs.');

  // --- NOTICES ---
  const notices = [
    {
      title: 'Admissions Open 2026-27',
      slug: 'admissions-open-2026-27',
      body: 'Admissions for the academic year 2026-27 are now open. Enroll your child today to get free books and bags!',
      publishAt: new Date(),
    },
    {
      title: 'Annual Sports Meet',
      slug: 'annual-sports-meet',
      body: 'Get ready for our Annual Sports Meet next month. All students are encouraged to participate and show their athletic skills.',
      publishAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      title: 'Parent-Teacher Meeting Scheduled',
      slug: 'ptm-scheduled',
      body: 'A Parent-Teacher Meeting will be held this Saturday. We request all parents to attend and discuss their child\'s progress.',
      publishAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
  ];

  for (const notice of notices) {
    const exists = await prisma.notice.findUnique({
      where: { slug: notice.slug },
    });
    if (!exists) {
      await prisma.notice.create({ data: notice });
    }
  }
  console.log('Seeded Notices.');

  // --- FACULTY ---
  const faculties = [
    {
      name: 'Sarah Smith',
      qualification: 'M.Sc., B.Ed.',
      subjectOrGrade: 'Science (Secondary)',
      order: 1,
    },
    {
      name: 'David Johnson',
      qualification: 'M.A., B.Ed.',
      subjectOrGrade: 'English & Literature',
      order: 2,
    },
    {
      name: 'Emily Davis',
      qualification: 'B.Sc., Early Childhood Education',
      subjectOrGrade: 'Tender Kidz Coordinator',
      order: 3,
    },
  ];

  for (const faculty of faculties) {
    const exists = await prisma.facultyMember.findFirst({
      where: { name: faculty.name },
    });
    if (!exists) {
      await prisma.facultyMember.create({ data: faculty });
    }
  }
  console.log('Seeded Faculty.');

  // --- TESTIMONIALS ---
  const testimonials = [
    {
      parentName: 'Priya Sharma',
      content: 'The teachers are incredibly supportive and my child looks forward to school every day!',
      rating: 5,
      approved: true,
    },
    {
      parentName: 'Rahul Verma',
      content: 'Paradise English School provides an excellent balance of academics and extracurriculars.',
      rating: 5,
      approved: true,
    },
    {
      parentName: 'Sneha Patel',
      content: 'Tender Kidz has been the perfect start for my daughter. The play-based learning is wonderful.',
      rating: 4,
      approved: true,
    },
  ];

  for (const testimonial of testimonials) {
    const exists = await prisma.testimonial.findFirst({
      where: { parentName: testimonial.parentName },
    });
    if (!exists) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
  console.log('Seeded Testimonials.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
