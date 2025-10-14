


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

  







  // PRO LANDING
fetch("ProLanding.html")
  .then((response) => {
    if (!response.ok) throw new Error("ProLanding failed");
    return response.text();
  })
  .then((html) => {
    const mount = document.getElementById("Pro_Landing");
    if (mount) {
      mount.innerHTML = html;
      // بعد از تزریق HTML، اسلایدر را مقداردهی کن
      initLandingProductSlider(mount);
    }
  })
  .catch((error) => {
    console.error(":", error);
  });


  function initLandingProductSlider(scope){
  // scope همون #Pro_Landing است
  const track   = scope.querySelector("#sliderTrack");
  const prevBtn = scope.querySelector("#prevBtn");
  const nextBtn = scope.querySelector("#nextBtn");
  const cards   = track ? Array.from(track.querySelectorAll(".product-card")) : [];

  if (!track || !prevBtn || !nextBtn || cards.length === 0) {
    console.warn("Slider: elements not found");
    return;
  }

  let index = 0;      // ایندکس اولین کارتِ قابل مشاهده
  let step  = 0;      // فاصله حرکت به اندازه یک کارت (px)
  let maxIndex = 0;   // بیشترین ایندکس مجاز
  const viewport = scope.querySelector(".slider-container");

  function measure(){
    if (cards.length === 0) return;

    // فاصله افقی بین کارت 0 و 1 (عرض واقعی کارت + پدینگ‌ها)
    const r0 = cards[0].getBoundingClientRect();
    if (cards.length >= 2) {
      const r1 = cards[1].getBoundingClientRect();
      step = Math.round(r1.left - r0.left);
    } else {
      step = Math.round(r0.width);
    }

    const vw = viewport.clientWidth;
    // چند کارت در نما جا می‌شود؟ (بر اساس عرض واقعی کارت)
    const perView = Math.max(1, Math.round(vw / step));
    maxIndex = Math.max(0, cards.length - perView);

    // اگر بعد از ریسایز خارج شد، اصلاح
    if (index > maxIndex) index = maxIndex;

    apply();
    updateButtons();
  }

  function apply(){
    const x = -(index * step);
    // بدون تغییر CSS، فقط transform پیکسلی می‌گذاریم
    track.style.transform = `translateX(${x}px)`;
  }

  function updateButtons(){
    prevBtn.disabled = (index <= 0);
    nextBtn.disabled = (index >= maxIndex);
  }

  function goNext(){
    if (index < maxIndex){
      index += 1; // اگر خواستی صفحه‌ای حرکت کند: index += perView (ذخیره perView لازم است)
      if (index > maxIndex) index = maxIndex;
      apply(); updateButtons();
    }
  }
  function goPrev(){
    if (index > 0){
      index -= 1;
      if (index < 0) index = 0;
      apply(); updateButtons();
    }
  }

  // لیسنرها
  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  // افکت Add to Cart (مثل قبل)
  scope.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent;
      const originalBg   = this.style.background;

      this.textContent = "Added!";
      this.style.background = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = originalBg;
      }, 1500);
    });
  });

  // ریسایز/لود برای اندازه‌گیری مجدد
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 120);
  });
  // اگر تصاویر لِیزی باشند
  cards.forEach(card => {
    const img = card.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", measure, { once: true });
  });

  // استارت
  measure();
}