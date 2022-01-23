const driedG = prompt("Weight dried (g)");
const cookedG = prompt("Weight cooked (g)");
const cannedG = cookedG * 1.66667;
const cookedMl = prompt("Volume cooked (mL)");

const dryVolumeMl = prompt("Ratio: Volume dried ml");
const dryWeightG = prompt("Ratio: Volume dried g");

const dryMl = (dryVolumeMl / dryWeightG) * driedG;

return {
  "driedG": driedG,
  "cookedG": cookedG,
  "cannedG": cannedG,
  "cookedMl": cookedMl,
  "dryMl": dryMl
}

