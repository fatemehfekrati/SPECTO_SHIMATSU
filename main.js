// HEADER
fetch("menuHedear.html")
  .then(r => { if (!r.ok) throw new Error("Header failed to load"); return r.text(); })
  .then(html => {
    const el = document.getElementById("menuHedear");
    if (el) {
      el.innerHTML = html;
      initHeaderSidebar(); // ← wire the drawer after injecting the header
    } else {
      console.warn("Missing #menuHedear container");
    }
  })
  .catch(err => console.error("Header error:", err));
function initHeaderSidebar(){
  // 1) ریشه: هرکدوم بود استفاده می‌کنیم
  const container =
    document.getElementById('menuHeader') ||
    document.getElementById('menuHedear') ||
    document;

  // جلوگیری از دوبار اینیت
  if (container.dataset && container.dataset.sbInit === '1') return;
  if (container.dataset) container.dataset.sbInit = '1';

  // 2) انتخاب‌های مقاوم
  const hamburger =
    container.querySelector('.hamburger, [data-hamburger]') ||
    document.querySelector('.hamburger, [data-hamburger]');
  const desktopMenu =
    container.querySelector('.mainmenu nav > ul, nav.mainmenu > ul') ||
    document.querySelector('.mainmenu nav > ul, nav.mainmenu > ul');
  const logoImg =
    container.querySelector('#logo img') ||
    document.querySelector('#logo img');

<<<<<<< HEAD

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
=======
  if (!hamburger || !desktopMenu) {
    console.warn('SB: hamburger یا منو پیدا نشد');
    return;
>>>>>>> 4e8c35c65bf50f232637f22235ad82c757986bef
  }

  // 3) ساخت اوورلی و دراور
  let overlay = document.getElementById('sb-overlay');
  let drawer  = document.getElementById('sb-drawer');

  if (!overlay){
    overlay = document.createElement('div');
    overlay.id = 'sb-overlay';
    overlay.className = 'sb-overlay';
    overlay.hidden = true; // با is-open کلیک‌پذیر می‌شود
    document.body.appendChild(overlay);
  }
  if (!drawer){
    drawer = document.createElement('aside');
    drawer.id = 'sb-drawer';
    drawer.className = 'sb-drawer';
    drawer.setAttribute('aria-hidden','true');
    drawer.setAttribute('role','dialog');
    document.body.appendChild(drawer);
  }

  // 4) محتوای دراور
  const logoHTML = logoImg
    ? `<img class="sb-logo" src="${logoImg.getAttribute('src')}" alt="${logoImg.getAttribute('alt') || 'Logo'}">`
    : '';

  drawer.innerHTML = `
    <div class="sb-head">
      ${logoHTML}
      <button class="sb-close" aria-label="Close menu" type="button">&times;</button>
    </div>
    <nav class="sb-nav">${desktopMenu.outerHTML}</nav>
  `;

  const closeBtn = drawer.querySelector('.sb-close');

  // 5) زیرمنوها
  drawer.querySelectorAll('.vmegamenu').forEach(ul => { ul.style.display = 'none'; });
  drawer.querySelectorAll('.sb-nav > ul > li > a').forEach(a => {
    const sub = a.parentElement.querySelector('.vmegamenu');
    if (sub){
      a.classList.add('has-sub');
      if (!a.querySelector('.chev')) {
        a.insertAdjacentHTML('beforeend', `<span class="chev" aria-hidden="true">▸</span>`);
      }
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = sub.style.display === 'block';
        sub.style.display = isOpen ? 'none' : 'block';
        a.classList.toggle('is-open', !isOpen);
      });
    } else {
      a.addEventListener('click', () => closeSidebar());
    }
  });

  // 6) دسترسی‌پذیری
  hamburger.setAttribute('aria-controls','sb-drawer');
  hamburger.setAttribute('aria-expanded','false');

  // 7) توابع باز/بستن
  const onKeydown = (e) => { if (e.key === 'Escape') closeSidebar(); };

  const openSidebar = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    overlay.hidden = false;
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded','true');
    document.body.classList.add('noscroll');
    const firstFocusable = drawer.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable && firstFocusable.focus({ preventScroll: true });
    window.addEventListener('keydown', onKeydown);
    // برای دیباگ:
    // console.log('SB: opened');
  };

  const closeSidebar = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    hamburger.setAttribute('aria-expanded','false');
    document.body.classList.remove('noscroll');
    window.removeEventListener('keydown', onKeydown);
    hamburger.focus?.({ preventScroll: true });
    // console.log('SB: closed');
  };

  // 8) لیسنرها
  // باز/بستن با همبرگری
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // نذار کلیک به document بره
    drawer.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });

  // overlay
  overlay.addEventListener('click', closeSidebar);

  // کلیک‌های داخل دراور به بیرون نرسه
  drawer.addEventListener('click', (e) => e.stopPropagation());

  // کلیک خارج از دراور
  document.addEventListener('click', (e) => {
    const isOpen = drawer.classList.contains('is-open') || drawer.getAttribute('aria-hidden') === 'false';
    if (!isOpen) return;
    const outside = !drawer.contains(e.target) && !hamburger.contains(e.target);
    if (outside) closeSidebar();
  });

  // دکمه ×
  closeBtn.addEventListener('click', closeSidebar);

  // (اختیاری) بستن هنگام بزرگ شدن ویوپورت
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && drawer.classList.contains('is-open')) {
      closeSidebar();
    }
  });
}

// اجرا بعد از لود DOM
document.addEventListener('DOMContentLoaded', initHeaderSidebar);

<<<<<<< HEAD
  







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
=======

// FOOTER
fetch("Footer.html")
  .then(r => { if (!r.ok) throw new Error("Footer failed to load"); return r.text(); })
  .then(html => {
    const el = document.getElementById("Footer_Main");
    if (el) el.innerHTML = html;
  })
  .catch(err => console.error("Footer error:", err));

// OPTIONAL SECTIONS — these may not exist on this page; guard them
fetch("NewProductsPic.html")
  .then(r => { if (!r.ok) throw new Error("NewProductsPic failed"); return r.text(); })
  .then(html => {
    const el = document.getElementById("New_Products_Pic");
    if (el) el.innerHTML = html; // no el on this page → no error
  })
  .catch(err => console.error("NewProductsPic error:", err));

fetch("LeaveMessage.html")
  .then(r => { if (!r.ok) throw new Error("LeaveMessage failed"); return r.text(); })
  .then(html => {
    const el = document.getElementById("Leave_Message");
    if (el) el.innerHTML = html;
  })
  .catch(err => console.error("LeaveMessage error:", err));

// PRO LANDING
fetch("ProLanding.html")
  .then(r => { if (!r.ok) throw new Error("ProLanding failed"); return r.text(); })
  .then(html => {
    const el = document.getElementById("Pro_Landing");
    if (el) el.innerHTML = html;
  })
  .catch(err => console.error("ProLanding error:", err));

// APP LANDING
fetch("AppLanding.html")
  .then(r => { if (!r.ok) throw new Error("AppLanding failed"); return r.text(); })
  .then(html => {
    const el = document.getElementById("App_Landing");
    if (el) el.innerHTML = html;
    if (typeof initApplications === "function") initApplications(); // ← avoids “not defined”
  })
  .catch(err => console.error("AppLanding error:", err));
>>>>>>> 4e8c35c65bf50f232637f22235ad82c757986bef
