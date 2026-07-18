import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { NoticesModule } from './notices/notices.module';
import { GalleryModule } from './gallery/gallery.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { FacultyModule } from './faculty/faculty.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadsModule } from './uploads/uploads.module';
import { GalleryCategoriesModule } from './gallery-categories/gallery-categories.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    PrismaModule,
    EnquiriesModule,
    NoticesModule,
    GalleryModule,
    TestimonialsModule,
    FacultyModule,
    SettingsModule,
    DashboardModule,
    UploadsModule,
    GalleryCategoriesModule,
    FaqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
