function getFormData(form) {
   var unindexedData = form.serializeArray();
   var indexedData = {};

   $.map(unindexedData, function (n) {
      indexedData[n["name"]] = n["value"];
   });

   return indexedData;
}

function setFormData(data) {
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
   sessionStorage.setItem("url_photo", res.data.url_photo);
   sessionStorage.setItem("type", res.data.type);
}

function getSession(value) {
   return sessionStorage.getItem(value);
}

function getToken() {
   return sessionStorage.getItem("token");
}

function checkUserLogged() {
   if (sessionStorage.getItem("token"))
      return true;
   else
      return false;
}

function getStatus(err) {
   return err.status;
}


function redirectPage(url) {
   location.href = url;
}

function openModal(text) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text
   }).show();
}

function showModalAndRedirect(text, url) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text,
      "onok": () => redirectPage(url)
   }).show();
}

function showSuccessAlert(text) {
   alertify.set("notifier", "position", "top-center");
   alertify.notify(text, "success");
}

function showErrorAlert(text) {
   alertify.set("notifier", "position", "top-center");
   alertify.notify(text, "error");
}

function startModal(element) {
   window.onclick = function (event) {
      if (event.target == element) {
         element.style.display = "none";
      }
   }
}

function closeModal(element) {
   element.css("display", "none")
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

function destroyElement(element) {
   element.remove();
}

function addButtonColumnToTable(elements) {
   elements.forEach(function (elem) {
      elem.table.children("thead").children("tr").append(elem.th);
      elem.table.children("tbody").children("tr").append(elem.td);
      $(elem.selector).append(elem.button);
   });
}


function checkHtmlExists(html) {
   if (html == "")
      return false;
   else
      return true;
}

function clearFormData(element) {
   element.reset();
}

function clearTextOfElement(element) {
   element.text("");
}