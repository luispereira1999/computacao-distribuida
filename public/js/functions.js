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

function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
}

function setCookie(cname, cvalue, exdays) {
   var d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   var expires = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function destroyCookies() {
   var allCookies = document.cookie.split(';');

   for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + "=;expires="
         + new Date(0).toUTCString();
}

function checkUserLogged() {
   if (getCookie("token"))
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

function refreshPage() {
   location.reload();
}

function openModal(text) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text
   }).show();
}

function showModalAndRedirect(title, message, url) {
   alertify.alert().setting({
      "title": title,
      "label": "Confirmar",
      "message": message,
      "onok": () => redirectPage(url)
   }).show();
}

function showModalAndRefresh(text) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text,
      "onok": () => refreshPage()
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

function logout() {
   destroyCookies();
   var url = "./index.html";
   showModalAndRedirect("Sucesso", "Sessão terminada com sucesso!", url);
}