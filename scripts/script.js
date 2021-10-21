$(document).ready(function () {
  let xArr = [];

  async function getData() {
    await axios
      .get(url)
      .then((response) => {
        handleResponse(response);
        // console.log("response", response.data);
        xArr.push(response);
      })
      .catch((error) =>
        alert(
          error.response +
            " Please try again and if this issue persists, please contact Inside Edge IT."
        )
      );
  }

  let recoverPkgBtn = document.getElementById("recoverPkgBtn");
  let storageItem = localStorage.getItem("package");

  storageItem =
    "" || storageItem === null
      ? recoverPkgBtn.classList.add("hidden")
      : recoverPkgBtn.classList.remove("hidden");

  getData();
});

let matTypesArr = [
  "Carpet",
  "Resilient",
  "Tile",
  "Concrete",
  "Transition",
  "Adhesive",
  "Prep",
  "CeilingTile",
  "Misc",
];
let pkgOptionsList = document.getElementById("pkgOptionsList");
let options = document.getElementById("options");
let matTypeList = document.getElementById("matTypeList");
let pkgOptionsBtn = document.getElementById("pkgOptionsBtn");
let helpText = document.getElementById("helperText");
let helperWrapper = document.getElementById("helper-wrapper");
let pkgDiv = document.getElementById("package");
let saveBtn = document.getElementById("saveBtn");
let connectBtn = document.getElementById("connectBtn");
let materialSearchInput = document.getElementById("materialSearchInput");
let srchError = document.getElementById("srchError");
let pkgNameInput = document.getElementById("pkgNameInput");
let errorMessage = document.getElementById("errorMessage");
let modalPkgBody = document.getElementById("modalPkgBody");
let modalPkgTitle = document.getElementById("modalPkgTitle");

let materialArr = [];
let pkgArr = [];
let resArr = [];

let carpetIcon = "project-diagram";
let resilientIcon = "chart-network";
let miscIcon = "code-branch";
let buildPkgHelperText =
  "To build package, drag material block from left to right";

const code = "0YFHAstDb4GOYLHaZijZ8EctBn/LpPjrIWN19mwwzirReN1sI0/S3Q==";
const url = `https://soxv6.azurewebsites.net/Materials?code=${code}`;

const createSideMenuBtn = (matType) => {
  return `
    <button class="btn btn-secondary btn-sm sideBarBtn" 
      id="${matType}" 
      onclick="showMatTypes(this.id);return false;"
    >
        <div class="row">
          <div class="col-md-12" style="text-align: left">
            ${matType}
          </div>
        </div>
    </button>
    <br />`;
};

const getMenuBtnHtml = (matType) => {
  matTypeList.innerHTML += createSideMenuBtn(matType);
};

matTypesArr.map(function (matType) {
  matType === "Carpet" && getMenuBtnHtml(matType);
  matType === "Resilient" && getMenuBtnHtml(matType);
  matType === "Misc" && getMenuBtnHtml(matType);
});

async function showMatTypes(mat) {
  options.innerHTML = "";

  options.innerHTML = `
    <div class="progress" style="height: 2.4rem;">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;margin-top:10px;">Loading...</div>
    </div>
  `;

  await axios
    .get(url)
    .then((response) => {
      handleResponse(response);
      console.log();
    })
    .catch((error) =>
      alert(
        error.response +
          " Please try again and if this issue persists, please contact IT."
      )
    );

  let _mat = materialArr[0];
  let carpetOptions = _mat.filter((x) => x.typeId === 1);
  let resilientOptions = _mat.filter((x) => x.typeId === 2);
  let miscOptions = _mat.filter((x) => x.typeId === 9);

  options.innerHTML = "";

  mat === "Carpet" && getElement(carpetOptions, mat);
  mat === "Resilient" && getElement(resilientOptions, mat);
  mat === "Misc" && getElement(miscOptions, mat);
}

function getElement(option, matType) {
  let localStorageArr = [];
  let currentPkg = localStorage.getItem("package");
  let chars = currentPkg.split(",");

  chars.map((item) => localStorageArr.push(parseInt(item)));

  let newArr = option.map(function (item) {
    if (item.styleId === "null" || item.styleId === undefined) {
      item.styleId = "";
    }
    return item;
  });

  let filteredPkgs = newArr.filter(
    (item) => !localStorageArr.includes(item.mId)
  );

  filteredPkgs.map(
    (mat) => (options.innerHTML += createMaterialElement(mat, matType))
  );
}

const createMaterialElement = (mat, matType) => {
  let html = `
      <div 
        class="row optionsList ${matType}" 
        id="${mat.mId}"
        ondragstart="dragStart(event)" 
        draggable="true"
        ondragover="noAllowDrop(event)"
        style="padding:0;"
      >
        <div class="col-md-4" style="text-align:left;">
          <span id="dragMfrName">
            ${mat.mfrName} 
          </span>
        </div>
        <div class="col-md-8">
            <span style="font-weight:600;">Style:</span> ${mat.styleId} ${mat.styleName}<br />
            <span style="font-weight:600;">Color:</span> ${mat.colorId} ${mat.colorName}<br />
        </div>
      </div>
    `;

  return html
    ? html
    : "There is an issue rendering the element.  Please try again.<br />";
};

const handleResponse = (response) => {
  resArr = [];
  let res = response.data;
  resArr.push(res);

  res.forEach(function (object) {
    for (key in object) {
      if (object[key] == null) object[key] = "";
      materialArr.push(res);
    }
  });
};

pkgNameInput.addEventListener(
  "input",
  function (e) {
    errorMessage.innerHTML = "";
  },
  false
);

const clrPkg = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action will be permanent!",
    icon: "warning",
    showClass: {
      backdrop: "swal2-noanimation",
      popup: "",
      icon: "",
    },
    hideClass: {
      popup: "",
    },
    width: "320px",
    position: "top",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#dd3333d9",
    customClass: {},
    confirmButtonText: "Yes, clear package!",
  }).then((result) => {
    pkgNameInput.value = "";
    result.isConfirmed && clrBoard();
  });
};

const clrBoard = () => {
  let packageHandlerBtns = document.querySelectorAll(".packageHandlerBtn");

  packageHandlerBtns.forEach((button) => {
    button.disabled = true;
  });

  clrBtn.disabled = true;
  saveBtn.classList.remove("hidden");
  // connectBtn.classList.add("hidden");
  recoverPkgBtn.classList.remove("hidden");

  package.innerHTML = "";
  options.innerHTML = "";
};

function recoverPackage() {
  let matList = resArr[0];
  let currentPackage = localStorage.getItem("package");
  let packageName = localStorage.getItem("packageName");
  let convertedArr = [];

  if (currentPackage) {
    let chars = currentPackage.split(",");

    Object.values(chars).forEach((val) => {
      convertedArr.push(parseInt(val));
    });

    let recoveredPkg = matList.filter((item) =>
      convertedArr.includes(item.mId)
    );

    recoveredPkg.map(function (item) {
      if (item.styleId === "null" || item.styleId === undefined) {
        item.styleId = "";
      }
      return item;
    });

    pkgNameInput.value = packageName;

    recoveredPkg.map(function (mat) {
      let materialType = mat.typeId;

      materialType === 1 && recoveredMaterial(mat, "Carpet");
      materialType === 2 && recoveredMaterial(mat, "Resilient");
      materialType === 9 && recoveredMaterial(mat, "Misc");
    });
  } else {
    errorMessage.innerHTML = `<i class="far fa-exclamation-circle" style="margin-right:5px;font-size:20px"></i>Previous package not available, try building a new package.`;
  }
}

function recoveredMaterial(mat, matType) {
  let html = `
      <div 
        class="row optionsList ${matType}" 
        id="${mat.mId}"
        ondragstart="dragStart(event)" 
        draggable="true"
        ondragover="noAllowDrop(event)"
        style="padding:0;"
      >
        <div class="col-md-4" style="text-align:left;">
          <span id="dragMfrName">
            ${mat.mfrName} 
          </span>
        </div>
        <div class="col-md-8">
            <span style="font-weight:600;">Style:</span> ${mat.styleId} ${mat.styleName}<br />
            <span style="font-weight:600;">Color:</span> ${mat.colorId} ${mat.colorName}<br />
        </div>
      </div>
    `;

  package.innerHTML += html;
  recoverPkgBtn.classList.add("hidden");
  saveBtn.disabled = false;
  clrBtn.disabled = false;
}

function savePackage() {
  const pkgIds = $.map($("#package > div"), (div) => div.id);

  pkgNameInput.value.length === 0 &&
    (errorMessage.innerHTML = "Package name required to save package!");

  if (pkgNameInput.value.length > 0) {
    localStorage.setItem("packageName", pkgNameInput.value);
    localStorage.setItem("package", pkgIds);
    let storedArr = [];
    let storedPkg = localStorage.getItem("package");
    let chars = storedPkg.split(",");

    Object.values(chars).forEach((val) => {
      storedArr.push(parseInt(val));
    });
    $("#pkgModal").modal("show");

    //Build package from Local Storage
    let pkgModalBody = `          
    <p>Modal body text goes here.</p>`;

    let localPkgName = localStorage.getItem("packageName");
    pkgNameInput.value = "";
    package.innerHTML = "";
    modalPkgBody.innerHTML = pkgModalBody;
    modalPkgTitle.innerHTML = `${localPkgName} Package`;
    saveBtn.disabled = true;
    // saveBtn.classList.add("hidden");
    // connectBtn.classList.remove("hidden");

    let recoverPkgBtn = document.getElementById("recoverPkgBtn");
    let storageItem = localStorage.getItem("package");

    console.log("storageItem", storageItem);

    storageItem =
      "" || storageItem === null
        ? recoverPkgBtn.classList.add("hidden")
        : recoverPkgBtn.classList.remove("hidden");
  }
}

const connectJob = () => {
  console.log("in connect job");
};

const toggleBtn = (id) => {
  let buttonToToggle = document.getElementById(id);

  console.log(buttonToToggle.classList);

  if (buttonToToggle.classList === "hidden") {
    buttonToToggle.classList.remove("hidden");
  }
  if (buttonToToggle.classList != "hidden") {
    buttonToToggle.classList.add("hidden");
  }
};

$("#srchMatBtn").on("click", function () {
  options.innerHTML = "";
  let matSrchVal = materialSearchInput.value;
  let filter = matSrchVal.charAt(0).toUpperCase() + matSrchVal.slice(1);
  if (!filter) {
    srchError.innerHTML = "Search term required";
  } else {
    // Sends object to srchMatArr.js file
    srchMatArr(resArr, filter);
    materialSearchInput.value = "";
  }
});

document.addEventListener(
  "dragstart",
  function (event) {
    dragged = event.target;
    dragged.style.opacity = 1;
    // dragged.style.background = "#ee6c4d75";
    dragged.style.borderColor = "red";
    dragged.style.borderWidth = "3px";
    event.dataTransfer.setData("text", event.target.id);
  },
  false
);

document.addEventListener(
  "dragend",
  function (event) {
    event.target.style.opacity = "";
    event.target.style.background = "";
  },
  false
);

document.addEventListener(
  "drop",
  function (event, target) {
    errorMessage.innerHTML = "";
    localStorage.removeItem("package");
    localStorage.removeItem("packageName");
    recoverPkgBtn.classList.add("hidden");
    event.preventDefault();

    clrBtn.disabled = false;
    saveBtn.disabled = false;

    dragged.style.borderColor = "";
    dragged.style.borderWidth = "";

    event.target.className == "dropzone" &&
      ((event.target.style.background = "red"),
      dragged.parentNode.removeChild(dragged),
      event.target.appendChild(dragged));

    pageScroll();
    // playSound();

    var data = event.dataTransfer.getData("text");
    var material = event.target.appendChild(document.getElementById(data));
    let matId = material.id;

    pkgArr.push(matId);
  },
  false
);

document.addEventListener("drag", function (event) {}, false);

document.addEventListener("drop", function (event) {}, false);

const playSound = () => {
  let path = "./whiz2.mp3";
  let sound = new Audio(path);
  sound.play();
};

const pageScroll = () => {
  let $pkgOptions = document.querySelector("#package");
  $pkgOptions.scrollTop = $pkgOptions.scrollHeight;
};

$(".sideBarBtn").mouseover(function () {
  let btnId = this.id;
  $(`#${btnId}`).prop(
    "title",
    `Click to open ${this.id} materials in left panel`
  );
});

const noAllowDrop = (ev) => {
  ev.stopPropagation();
};
