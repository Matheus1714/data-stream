interface argRule {
  key: string;
  parse: (value: string | boolean) => unknown;
}

const argRules = [
  {
    key: "n",
    parse: (value: string | boolean) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("The value --n must be a number");
      }
      return numValue;
    },
  },
];

export function getArgs() {
  return process.argv.reduce((args, arg) => {
    if (arg.startsWith("--")) {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;

      const rule = argRules.find((r) => r.key === longArgFlag);
      args[longArgFlag] = rule ? rule.parse(longArgValue) : longArgValue;
    } else if (arg[0].startsWith("-")) {
      const flags = arg.slice(1).split("");
      flags.forEach((flag) => (args[flag] = true));
    }
    return args;
  }, {} as { [key: string]: string | boolean | number } & { n: number });
}
