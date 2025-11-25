// ================== هدر (Menu Header) ==================

function initHeaderMenu() {
  const header = document.getElementById("menuHeader");
  if (!header) {
    console.warn("menuHeader not found");
    return;
  }

  const hamburger = header.querySelector(".hamburger");
  const menu      = header.querySelector(".mainmenu");
  const overlay   = header.querySelector(".overlay");
  const closeBtn  = header.querySelector(".sidebar-close");

  if (!hamburger || !menu) {
    console.warn("Header menu elements not found.");
    return;
  }

  function openMenu() {
    menu.classList.add("open");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    hamburger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    menu.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  // باز/بسته کردن
  hamburger.addEventListener("click", openMenu);
  if (closeBtn)  closeBtn.addEventListener("click", closeMenu);
  if (overlay)   overlay.addEventListener("click", closeMenu);

  // بستن با Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // آکاردئون‌ها + بستن منو روی کلیک لینک
  menu.addEventListener("click", (e) => {
    // دکمه‌ی آکاردئون
    const accBtn = e.target.closest(".side-accordion");
    if (accBtn) {
      const li = accBtn.closest(".has-sub");
      if (!li) return;

      const willOpen = !li.classList.contains("open");
      li.classList.toggle("open", willOpen);
      accBtn.setAttribute("aria-expanded", String(willOpen));
      return; // نذار به‌عنوان لینک رفتار کنه
    }

    // اگر روی لینک کلیک شد → منو بسته شود
    const link = e.target.closest("a");
    if (link) {
      closeMenu();
      // preventDefault نمی‌ذاریم تا صفحه عوض بشه
    }
  });

  // وقتی صفحه رفت روی دسکتاپ، منو بسته شود
  window.matchMedia("(min-width: 993px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
}

// بعد از لود شدن HTML هدر، منو را مقداردهی می‌کنیم
fetch("menuHedear.html")
  .then((response) => {
    if (!response.ok) throw new Error("Header load failed");
    return response.text();
  })
  .then((html) => {
    document.getElementById("menuHedear").innerHTML = html;
    initHeaderMenu(); // ✅ اینجا صدا زده می‌شود
  })
  .catch((error) => {
    console.error("Header:", error);
  });


// ================== Footer ==================

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


// ================== New Products Pic ==================

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


// ================== Leave Message ==================

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


// ================== Applications Landing ==================

function initApplications() {
  const nav   = document.getElementById("apps-nav");
  const img   = document.getElementById("apps-hero");
  const title = document.getElementById("apps-title");
  const desc  = document.getElementById("apps-desc");
  const cta   = document.getElementById("apps-cta");

  if (!nav || !img || !title || !desc || !cta) return;

  nav.addEventListener("click", (e) => {
    const a = e.target.closest(".apps__nav-item");
    if (!a) return;
    e.preventDefault();

    nav
      .querySelectorAll(".apps__nav-item")
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

fetch("OurMissionLanding.html")
  .then((response) => {
    if (!response.ok) throw new Error("");
    return response.text();
  })
  .then((html) => {
    document.getElementById("OurMission_Landing").innerHTML = html;
    initApplications();
  })
  .catch((error) => {
    console.error(":", error);
  });


// ================== Pro Landing Slider ==================

fetch("ProLanding.html")
  .then((response) => {
    if (!response.ok) throw new Error("ProLanding failed");
    return response.text();
  })
  .then((html) => {
    const mount = document.getElementById("Pro_Landing");
    if (mount) {
      mount.innerHTML = html;
      initLandingProductSlider(mount);
    }
  })
  .catch((error) => {
    console.error(":", error);
  });

function initLandingProductSlider(scope) {
  const track   = scope.querySelector("#sliderTrack");
  const prevBtn = scope.querySelector("#prevBtn");
  const nextBtn = scope.querySelector("#nextBtn");
  const cards   = track ? Array.from(track.querySelectorAll(".product-card")) : [];

  if (!track || !prevBtn || !nextBtn || cards.length === 0) {
    console.warn("Slider: elements not found");
    return;
  }

  let index    = 0;
  let step     = 0;
  let maxIndex = 0;
  const viewport = scope.querySelector(".slider-container");

  function measure() {
    if (cards.length === 0) return;

    const r0 = cards[0].getBoundingClientRect();
    if (cards.length >= 2) {
      const r1 = cards[1].getBoundingClientRect();
      step = Math.round(r1.left - r0.left);
    } else {
      step = Math.round(r0.width);
    }

    const vw = viewport.clientWidth;
    const perView = Math.max(1, Math.round(vw / step));
    maxIndex = Math.max(0, cards.length - perView);

    if (index > maxIndex) index = maxIndex;

    apply();
    updateButtons();
  }

  function apply() {
    const x = -(index * step);
    track.style.transform = `translateX(${x}px)`;
  }

  function updateButtons() {
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  }

  function goNext() {
    if (index < maxIndex) {
      index += 1;
      if (index > maxIndex) index = maxIndex;
      apply();
      updateButtons();
    }
  }

  function goPrev() {
    if (index > 0) {
      index -= 1;
      if (index < 0) index = 0;
      apply();
      updateButtons();
    }
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  scope.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent;
      const originalBg = this.style.background;

      this.textContent = "Added!";
      this.style.background =
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = originalBg;
      }, 1500);
    });
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 120);
  });

  cards.forEach((card) => {
    const img = card.querySelector("img");
    if (img && !img.complete)
      img.addEventListener("load", measure, { once: true });
  });

  measure();
}
