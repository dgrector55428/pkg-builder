let pkgWrapper = document.getElementById("ddlPackagesWrapper");
let pkgUrl =
  "https://soxv6.azurewebsites.net/Packages?code=NOgZStuKQTWRSiRTG8kWsTMFpl/2GxYbz4ZJ4i8stTvw0acdKO2vPQ==";

async function getPkgData() {
  await axios
    .get(pkgUrl)
    .then((response) => {
      console.log(response.data);
      pkgResponse(response);
      let x = response.data;
    })
    .catch((error) =>
      alert(
        error.response +
          "Please try again. If this issue persists, please contact IT."
      )
    );
}

const pkgResponse = (response) => {
  let res = response.data;

  res.map((pkg) => {
    console.log(pkg.pkgName);

    let data = {
      id: pkg.Id,
      text: pkg.pkgName,
    };

    let newOption = new Option(data.text, data.id, true, false);
    $("#ddlPackages")
      .select2({
        placeholder: "Select Packages",
        allowClear: true,
      })
      .append(newOption)
      .trigger("change");

    $("#ddlPackages option:eq(0)").prop("selected", true);
  });
};

let placeholder = {
  id: 9999,
  text: "Select package",
};

let newOption = new Option(placeholder.text, placeholder.id, true, false);
$("#ddlPackages").select2().append(newOption).trigger("change");

// Get packages for dropdown
// getPkgData();
