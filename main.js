fetch("header.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });



fetch("menuHedear.html")
  .then((response) => {
    if (!response.ok) throw new Error("   ");
    return response.text();
  })
  .then((html) => {
    document.getElementById("menuHedear").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });

fetch("Footer.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("Footer_Main").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });

fetch("NewProductsPic.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("New_Products_Pic").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });


fetch("LeaveMessage.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("Leave_Message").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });
