let pkgWrapper = document.getElementById("ddlPackagesWrapper");

$("#ddlPackages").select2({
  ajax: {
    transport: function (params, success, failure) {
      axios
        .get("/rest/vue/1.0/profile/search", {
          query: $("#ddlPackages").val(),
        })
        .then(function (response) {
          success(response);
        })
        .catch(function (error) {
          alert(error);
        });
    },
    processResults: function (data) {
      var processedArray = [];
      data.profiles.forEach(function (item) {
        processedArray.push({ id: item.ID, text: item.name });
      });
      return processedArray;
    },
  },
  minimumInputLength: 2,
  placeholder: "Select a profile",
  allowClear: true,
});
