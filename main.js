


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


  fetch("ProLanding.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("Pro_Landing").innerHTML = html;
  })
  .catch((error) => {
    console.error(":", error);
  });

function initApplications() {
  const nav = document.getElementById("apps-nav");
  const img = document.getElementById("apps-hero");
  const title = document.getElementById("apps-title");
  const desc = document.getElementById("apps-desc");
  const cta = document.getElementById("apps-cta");

  if (!nav || !img || !title || !desc || !cta) return;

  nav.addEventListener("click", (e) => {
    const a = e.target.closest(".apps__nav-item");
    if (!a) return;
    e.preventDefault();

    nav.querySelectorAll(".apps__nav-item")
      .forEach((el) => el.classList.remove("is-active"));

    a.classList.add("is-active");
    img.src = a.dataset.img;
    title.textContent = a.dataset.title;
    desc.textContent = a.dataset.desc;
    cta.href = a.dataset.link || "#";
  });

  const activeItem = document.querySelector(".apps__nav-item.is-active");
  if (activeItem) {
    img.src = activeItem.dataset.img;
    title.textContent = activeItem.dataset.title;
    desc.textContent = activeItem.dataset.desc;
    cta.href = activeItem.dataset.link;
  }
}

  
 fetch("AppLanding.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("App_Landing").innerHTML = html;
    initApplications(); 
  })
  .catch((error) => {
    console.error(":", error);
  });

  