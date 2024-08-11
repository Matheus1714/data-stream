import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";
import { getArgs } from "./utils/get-args";

const args = getArgs();

const NUMBER_OF_DATA = args["n"] ?? 100;

console.log(NUMBER_OF_DATA);

const filePath = "data.csv";
const stream = fs.createWriteStream(filePath);

Array.from({ length: NUMBER_OF_DATA }).forEach(() => {
  const fakeData = [
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

  stream.write(`${fakeData}\n`);
});

stream.end();
