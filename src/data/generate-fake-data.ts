import { faker } from "@faker-js/faker";

export function generateFakeData(): string {
  return [
    faker.number.int(),
    faker.string.uuid(),
    faker.animal.cat(),
    faker.animal.cetacean(),
    faker.color.rgb(),
    faker.date.birthdate(),
    faker.company.name(),
    faker.person.firstName(),
    faker.person.lastName(),
    faker.person.gender(),
    faker.finance.amount(),
  ].join(",");
}
