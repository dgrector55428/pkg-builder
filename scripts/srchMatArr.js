function srchMatArr(materialArr, srchVal) {
  let materials = materialArr[0];
  let mfrName = materials.filter((item) => srchVal.includes(item.mfrName));

  let cptNameResults = mfrName.filter((x) => x.typeId === 1);
  let resNameResults = mfrName.filter((x) => x.typeId === 2);
  let miscNameResults = mfrName.filter((x) => x.typeId === 9);

  cptNameResults && getElement(cptNameResults, "Carpet");
  resNameResults && getElement(resNameResults, "Resilient");
  miscNameResults && getElement(miscNameResults, "Misc");
}
