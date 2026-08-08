import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { formatInTimeZone } from 'date-fns-tz';

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Formats a date to a human-readable string in a specific timezone
   * @param date - The date to format
   * @param format - The format string (e.g., 'yyyy-MM-dd HH:mm')
   * @param timeZone - The timezone (defaults to the configured app timezone)
   */
  formatDateTime(
    date: Date,
    format = 'yyyy-MM-dd HH:mm',
    timeZone?: string,
  ): string {
    const resolvedTimeZone =
      timeZone ?? this.configService.getOrThrow<string>('timezone');
    return formatInTimeZone(date, resolvedTimeZone, format);
  }

  /**
   * Converts a string into a URL-friendly slug.
   * @example
   * slugify("Café au lait") // "cafe-au-lait"
   * slugify("  Leading and trailing spaces  ") // "leading-and-trailing-spaces"
   * slugify("Multiple   spaces") // "multiple-spaces"
   * slugify("Special characters !@#$%^&*()") // "special-characters"
   */
  slugify(text: string): string {
    return text
      .normalize('NFD') // Normalize accents
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '') // Remove non-alphanumeric
      .replace(/--+/g, '-') // Collapse multiple hyphens
      .replace(/^-+/, '') // Trim leading hyphens
      .replace(/-+$/, ''); // Trim trailing hyphens
  }
}
