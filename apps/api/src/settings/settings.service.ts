import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.client.settings.findFirst();
    if (settings) {
      return {
        ...settings,
        phones: settings.phones ? JSON.parse(settings.phones) : [],
        heroImages: settings.heroImages ? JSON.parse(settings.heroImages) : [],
        aboutImages: settings.aboutImages
          ? JSON.parse(settings.aboutImages)
          : [],
        instagramReels: settings.instagramReels
          ? JSON.parse(settings.instagramReels)
          : [],
      };
    }
    return {
      id: '',
      address: '',
      phones: [],
      hours: '',
      instagramUrl: '',
      facebookUrl: '',
      threadsUrl: '',
      principalName: '',
      principalMessage: '',
      principalImage: '',
      heroImages: [],
      marqueeText: '',
      aboutImages: [],
      parentInvolvementImage: '',
      instagramReels: [],
      extracurricularImage: '',
      eventsImage: '',
    };
  }

  async update(updateSettingDto: UpdateSettingDto) {
    const existing = await this.prisma.client.settings.findFirst();

    const data: any = { ...updateSettingDto };
    if (updateSettingDto.phones) {
      data.phones = JSON.stringify(updateSettingDto.phones);
    }
    if (updateSettingDto.heroImages) {
      data.heroImages = JSON.stringify(updateSettingDto.heroImages);
    }
    if (updateSettingDto.aboutImages) {
      data.aboutImages = JSON.stringify(updateSettingDto.aboutImages);
    }
    if (updateSettingDto.instagramReels) {
      data.instagramReels = JSON.stringify(updateSettingDto.instagramReels);
    }

    let updated;
    if (existing) {
      updated = await this.prisma.client.settings.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await this.prisma.client.settings.create({
        data,
      });
    }

    return {
      ...updated,
      phones: updated.phones ? JSON.parse(updated.phones) : [],
      heroImages: updated.heroImages ? JSON.parse(updated.heroImages) : [],
      aboutImages: updated.aboutImages ? JSON.parse(updated.aboutImages) : [],
      instagramReels: updated.instagramReels
        ? JSON.parse(updated.instagramReels)
        : [],
    };
  }
}
