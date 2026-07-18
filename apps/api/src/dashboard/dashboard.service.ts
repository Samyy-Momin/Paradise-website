import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnquiryStatus, EnquiryBranch } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const [enquiriesThisMonth, enquiriesLastMonth, allEnquiries, noticesCount, galleryCount] = await Promise.all([
      this.prisma.client.enquiry.count({
        where: { createdAt: { gte: startOfThisMonth } },
      }),
      this.prisma.client.enquiry.count({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
      this.prisma.client.enquiry.findMany({
        select: { status: true, branch: true },
      }),
      this.prisma.client.notice.count(),
      this.prisma.client.galleryItem.count(),
    ]);

    const conversionRateByStage: Record<string, number> = {};
    const enquiriesByBranch: Record<string, number> = {
      PARADISE_ENGLISH_SCHOOL: 0,
      TENDER_KIDZ_PRE_SCHOOL: 0,
    };

    for (const enq of allEnquiries) {
      conversionRateByStage[enq.status] = (conversionRateByStage[enq.status] || 0) + 1;
      enquiriesByBranch[enq.branch] = (enquiriesByBranch[enq.branch] || 0) + 1;
    }

    return {
      enquiriesThisMonth,
      enquiriesLastMonth,
      conversionRateByStage,
      enquiriesByBranch,
      totalEnquiries: allEnquiries.length,
      noticesCount,
      galleryCount,
    };
  }
}
