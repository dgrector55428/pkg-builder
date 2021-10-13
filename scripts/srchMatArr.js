function srchMatArr(materialArr, srchVal) {
  let cptNameResults = materialArr[0]
    .filter((item) => srchVal.includes(item.mfrName))
    .filter((x) => x.typeId === 1);
  let resNameResults = materialArr[0]
    .filter((item) => srchVal.includes(item.mfrName))
    .filter((x) => x.typeId === 2);
  let miscNameResults = materialArr[0]
    .filter((item) => srchVal.includes(item.mfrName))
    .filter((x) => x.typeId === 9);

  cptNameResults && getElement(cptNameResults, "Carpet");
  resNameResults && getElement(resNameResults, "Resilient");
  miscNameResults && getElement(miscNameResults, "Misc");
}
