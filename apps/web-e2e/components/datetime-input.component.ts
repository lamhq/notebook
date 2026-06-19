import { Locator, Page } from '@playwright/test';

export class DateTimeInputComponent {
  constructor(
    protected readonly page: Page,
    protected readonly inputName: string,
  ) {}

  private getDateContainer(): Locator {
    return this.page.locator('div.MuiDateTimePickerToolbar-dateContainer');
  }

  private getTimeContainer(): Locator {
    return this.page.locator('div.MuiDateTimePickerToolbar-timeContainer');
  }

  private getTimeDigitsContainer(): Locator {
    return this.getTimeContainer().locator(
      'div.MuiDateTimePickerToolbar-timeDigitsContainer',
    );
  }

  private async selectYearAndMonth(year: number, month: number): Promise<void> {
    // Click the first button in dateContainer to open year view
    await this.getDateContainer().locator('button').first().click();

    // Select desired year
    await this.page.getByRole('radio', { name: year.toString() }).click();

    // Click the second button in dateContainer to open calendar view
    await this.getDateContainer().locator('button').nth(1).click();

    // Month names mapping
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const targetMonthName = monthNames[month - 1];
    const targetLabel = `${targetMonthName} ${year.toString()}`;

    // Get the label showing current month
    const label = this.page.locator('div.MuiPickersCalendarHeader-label');
    const labelText = await label.textContent();

    // If already at target month, no need to navigate
    if (labelText?.trim() === targetLabel) {
      return;
    }

    // Parse current month from label (e.g., "May 2025" -> May)
    const parts = labelText?.split(' ') ?? [];
    const currentMonthName = parts[0];
    const currentMonth = monthNames.indexOf(currentMonthName) + 1;

    // Calculate the difference in months (year is already selected)
    const monthDifference = month - currentMonth;

    // Decide which direction to navigate based on the difference
    const direction = monthDifference > 0 ? 'Next month' : 'Previous month';

    // Navigate to the target month by clicking the appropriate button
    for (let i = 0; i < Math.abs(monthDifference); i++) {
      await this.page.getByRole('dialog').getByLabel(direction).click();
      // const targetMonth =
      //   monthDifference > 0 ? currentMonth + i + 1 : currentMonth - i - 1;
      // const targetMonthName = monthNames[targetMonth - 1];
      // await this.page
      //   .locator('div.MuiPickersCalendarHeader-label', {
      //     hasText: `${targetMonthName} ${year.toString()}`,
      //   })
      //   .waitFor({ timeout: 50 });
    }
  }

  private async selectDay(day: string): Promise<void> {
    // Click the day in the calendar grid
    await this.page
      .getByRole('dialog')
      .getByRole('gridcell', { name: day })
      .first()
      .click();
  }

  private async selectHour(hour: string): Promise<void> {
    // Click the first button in timeDigitsContainer to select hour
    await this.getTimeDigitsContainer().locator('button').first().click();

    // Click the desired hour in the clock
    await this.page
      .getByRole('option', { name: `${hour} hours`, exact: true })
      .click({ force: true });
  }

  private async selectMinute(minute: string): Promise<void> {
    // Validate that minute is a multiple of 5
    const minuteNum = parseInt(minute, 10);
    if (minuteNum % 5 !== 0) {
      throw new Error(`Minute must be a multiple of 5, got ${minute}`);
    }

    // Click the second button in timeDigitsContainer to select minute
    await this.getTimeDigitsContainer().locator('button').nth(1).click();

    // Click the desired minute in the clock
    await this.page
      .getByRole('option', { name: `${minute} minutes` })
      .click({ force: true });
  }

  private async selectAmPm(period: 'AM' | 'PM'): Promise<void> {
    // Click AM or PM button
    await this.page.getByRole('button', { name: period }).click();
  }

  public async setDateTime(date: Date): Promise<void> {
    // Click the date input to open the picker
    await this.page
      .locator(`input[name="${this.inputName}"]`)
      .click({ timeout: 3000 });

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = (hours % 12 || 12).toString();

    // Set all date and time components
    await this.selectYearAndMonth(year, month);
    await this.selectDay(day);
    await this.selectHour(hour);
    await this.selectMinute(minutes);
    await this.selectAmPm(period);
    await this.page
      .locator('div.MuiDialogActions-root')
      .getByRole('button', { name: 'OK' })
      .click();
  }
}
