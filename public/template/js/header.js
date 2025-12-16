(() => {
  const hamburger = document.querySelector(".hamburger");
  const drawer = document.getElementById("mobileMenu");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".sidebar-close");

  if (!hamburger || !drawer || !overlay || !closeBtn) return;

  const openMenu = () => {
    drawer.classList.add("open");
    overlay.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  hamburger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Submenus: فقط با کلیک روی فلش
  drawer.querySelectorAll(".has-sub").forEach((item) => {
    const toggle = item.querySelector(".side-toggle");
    const sub = item.querySelector(".sub");
    if (!toggle || !sub) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = item.classList.contains("open");

      // اگر می‌خوای فقط یکی باز باشد، این ۳ خط را نگه دار:
      drawer.querySelectorAll(".has-sub.open").forEach((x) => {
        if (x !== item) {
          x.classList.remove("open");
          const t = x.querySelector(".side-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // اگر روی لینک‌های داخل submenu کلیک شد، منو بسته شود (اختیاری ولی UX خوب)
  drawer.querySelectorAll(".sub a, .side-link, .side-text").forEach((a) => {
    a.addEventListener("click", () => {
      // فقط وقتی drawer باز است ببند
      if (drawer.classList.contains("open")) closeMenu();
    });
  });
})();
