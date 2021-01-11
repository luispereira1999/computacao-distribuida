function getFormData(form) {
   var unindexedData = form.serializeArray();
   var indexedData = {};

   $.map(unindexedData, function (n) {
      indexedData[n["name"]] = n["value"];
   });

   return indexedData;
}


function setFormData(data, element) {
   var formData = "";

   for (const [key, value] of Object.entries(data)) {
      formData += $("input[name='" + key + "']").val(value);
      if (key == "description")
         formData += $("textarea").text(value);
   }
}


function setSession(res) {
   sessionStorage.setItem("token", res.token);
   sessionStorage.setItem("id", res.data.id);
   sessionStorage.setItem("username", res.data.username);
   sessionStorage.setItem("name", res.data.name);
   sessionStorage.setItem("email", res.data.email);
   sessionStorage.setItem("type", res.data.type);
}


function showMessageAndRedirect(text, url) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text,
      "onok": () => redirectPage(url)
   }).show();
}


function showSuccessMessage(text) {
   alertify.set("notifier", "position", "top-center");
   alertify.notify(text, "success");
}


function showErrorMessage(text) {
   alertify.set("notifier", "position", "top-center");
   alertify.notify(text, "error");
}


function redirectPage(url) {
   location.href = url;
}


function getStatus(err) {
   return err.status;
}


function createTableWithData(data, element) {
   var header = getDataToTableHeader(data);
   var body = getDataToTableBody(data);

   element.children("thead").append(header);
   element.children("tbody").append(body);
}


function getDataToTableHeader(data) {
   var header;

   for (i = 0; i < data.length; i++) {
      header = "<tr>";
      for (const [key, value] of Object.entries(data[i]))
         header += " <th>" + key + "</th>";
      header += "</tr>";
   }

   return header;
}


function getDataToTableBody(data) {
   var body = "";
   var content = "";

   for (i = 0; i < data.length; i++) {
      var body = "<tr>";
      for (const [key, value] of Object.entries(data[i])) {
         body += "<td class='td-" + key + "'>" + value + "</td>";
      }
      body += "</tr>";
      content += body;
   }

   return content;
}


function checkContentInsideTable(html) {
   if (html == "")
      return false;
   else
      return true;
}


function destroyElement(element) {
   element.remove();
}


function addButtonColumnsToTable(element) {
   var thAccept = $("<th>Aceitar</th>");
   var thDecline = $("<th>Recusar</th>");
   var tdAccept = $("<td class='td-accept'></td>");
   var tdDecline = $("<td class='td-decline'></td>");
   var buttonAccept = $("<button class='button-accept-user'>Aceitar</button>")
   var buttonDecline = $("<button class='button-decline-user'>Recusar</button>");

   element.children("thead").children("tr").append(thAccept);
   element.children("thead").children("tr").append(thDecline);
   element.children("tbody").children("tr").append(tdAccept);
   element.children("tbody").children("tr").append(tdDecline);

   $(".td-accept").append(buttonAccept);
   $(".td-decline").append(buttonDecline);
}