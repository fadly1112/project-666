document.addEventListener("DOMContentLoaded", function () {
  var eye = document.getElementById("hellEye");
  var closedImg = eye ? eye.querySelector(".eye-closed") : null;
  var newLanding = document.getElementById("newLanding");
  var navNew = document.getElementById("navNew");
  var navArticle = document.getElementById("navArticle");
  var navbar = document.getElementById("navbar");
  var navbarLogo = document.getElementById("navbarLogo");
  var backBtn = document.getElementById("backBtn");
  var gateCard = document.getElementById("gateCard");
  var detailPage = document.getElementById("detailPage");
  var detailBack = document.getElementById("detailBack");
  var detailBg = document.getElementById("detailBg");
  var detailImg = document.getElementById("detailImg");
  var detailTitle = document.getElementById("detailTitle");
  var detailDesc = document.getElementById("detailDesc");
  var articlePage = document.getElementById("articlePage");
  var articleBack = document.getElementById("articleBack");
  var eyeToggle = document.getElementById("eyeToggle");
  var shirtGrid = document.getElementById("shirtGrid");
  var body = document.body;

  /* navbar: fading hitam muncul saat panel-panel discroll */
  function syncNav(top) {
    if (top > 12) navbar.classList.add("is-scrolled");
    else navbar.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", function () {
    syncNav(window.scrollY);
  });
  [newLanding, detailPage, articlePage].forEach(function (el) {
    el.addEventListener("scroll", function () {
      syncNav(el.scrollTop);
    });
  });

  function isOpen() {
    return newLanding.classList.contains("is-active");
  }

  function isArticleOpen() {
    return articlePage.classList.contains("is-active");
  }

  function isDetailOpen() {
    return detailPage.classList.contains("is-active");
  }

  // dipakai baik oleh mata maupun link NEW - tujuannya sama persis
  function openNewLanding() {
    if (isArticleOpen()) closeArticle();
    if (isWhoOpen()) closeWho();
    newLanding.classList.add("is-active");
    newLanding.setAttribute("aria-hidden", "false");
    body.classList.add("on-new-landing");
    if (navNew) navNew.classList.add("is-current");
  }

  function closeNewLanding() {
    newLanding.classList.remove("is-active");
    newLanding.setAttribute("aria-hidden", "true");
    body.classList.remove("on-new-landing");
    if (navNew) navNew.classList.remove("is-current");
    setTimeout(function () {
      if (!isOpen()) body.classList.remove("is-split");
    }, 900);
  }

  // Article page: fungsi kembar dari openNewLanding/closeNewLanding
  function openArticle() {
    if (isOpen()) closeNewLanding();
    if (isWhoOpen()) closeWho();
    articlePage.classList.add("is-active");
    articlePage.setAttribute("aria-hidden", "false");
    body.classList.add("on-article");
    if (navArticle) navArticle.classList.add("is-current");
  }

  function closeArticle() {
    articlePage.classList.remove("is-active");
    articlePage.setAttribute("aria-hidden", "true");
    body.classList.remove("on-article");
    if (navArticle) navArticle.classList.remove("is-current");
    if (shirtGrid) shirtGrid.classList.remove("is-open");
    if (eyeToggle) {
      eyeToggle.classList.remove("is-active");
      eyeToggle.setAttribute("aria-expanded", "false");
    }
  }

  // Eye: blink sekali lalu buka new landing page
  if (eye && closedImg) {
    eye.addEventListener("click", function () {
      if (eye.classList.contains("is-blinking") || isOpen()) return;
      eye.classList.add("is-blinking");
    });
    closedImg.addEventListener("animationend", function () {
      eye.classList.remove("is-blinking");
      openNewLanding();
    });
  }

  // NEW nav link: langsung buka new landing page (fungsi sama
  // persis dengan yang dipanggil mata di atas)
  if (navNew) {
    navNew.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isOpen()) openNewLanding();
    });
  }

  // Article nav link: buka article page
  if (navArticle) {
    navArticle.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isArticleOpen()) openArticle();
    });
  }

  if (backBtn) backBtn.addEventListener("click", closeNewLanding);
  if (articleBack) articleBack.addEventListener("click", closeArticle);

  if (gateCard) {
    gateCard.addEventListener("click", function () {
      body.classList.add("is-split");
    });
  }

  // logo navbar: klik -> selalu balik ke hero section, dari
  // panel manapun sedang aktif (new-landing / article / detail)
  if (navbarLogo) {
    navbarLogo.addEventListener("click", function (e) {
      e.preventDefault();
      if (isDetailOpen()) closeDetail();
      if (isArticleOpen()) closeArticle();
      if (isWhoOpen()) closeWho();
      if (isOpen()) closeNewLanding();
    });
  }

  // beri jeda bertingkat ke tiap kartu baju supaya kelihatan
  // "berbaris" satu per satu saat muncul
  function staggerShirts() {
    if (!shirtGrid) return;
    var items = shirtGrid.querySelectorAll(".shirt-card");
    items.forEach(function (item, i) {
      item.style.transitionDelay = i * 0.08 + "s";
    });
  }
  staggerShirts();

  // tombol mata di tengah article page: toggle munculnya grid baju
  if (eyeToggle && shirtGrid) {
    eyeToggle.addEventListener("click", function () {
      var open = shirtGrid.classList.toggle("is-open");
      eyeToggle.classList.toggle("is-active", open);
      eyeToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* card -> detail page */
  function openDetail(card) {
    detailBg.style.backgroundImage =
      "url('" + card.getAttribute("data-bg") + "')";
    detailImg.src = card.getAttribute("data-img");
    detailImg.alt = card.getAttribute("data-title");
    detailTitle.textContent = card.getAttribute("data-title");
    detailDesc.textContent = card.getAttribute("data-desc");

    detailPage.scrollTop = 0;
    detailPage.classList.add("is-active");
    detailPage.setAttribute("aria-hidden", "false");
    newLanding.setAttribute("aria-hidden", "true");
    body.classList.add("on-detail");
  }

  function closeDetail() {
    detailPage.classList.remove("is-active");
    detailPage.setAttribute("aria-hidden", "true");
    newLanding.setAttribute("aria-hidden", "false");
    body.classList.remove("on-detail");
  }

  Array.prototype.forEach.call(
    document.querySelectorAll(".card"),
    function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.addEventListener("click", function () {
        openDetail(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(card);
        }
      });
    },
  );

  if (detailBack) detailBack.addEventListener("click", closeDetail);

  // ---- WHO page: gerbang terakhir, background di-crossfade
  // lintas 3 scene: kuburan.png (scene 1) -> hitam -> penjaga.png
  // (scene 2, ketik pertanyaan + input nama) -> hitam ->
  // ending.jpg (scene 3, nama + game over + rebirth) ----
  var whoPage = document.getElementById("whoPage");
  var whoBack = document.getElementById("whoBack");
  var navWho = document.getElementById("navWho");
  var whoBg = document.getElementById("whoBg");
  var whoScene1 = document.getElementById("whoScene1");
  var whoScene2 = document.getElementById("whoScene2");
  var whoScene3 = document.getElementById("whoScene3");
  var whoWord = document.getElementById("whoWord");
  var whoTyped = document.getElementById("whoTyped");
  var whoForm = document.getElementById("whoForm");
  var whoInput = document.getElementById("whoInput");
  var whoName = document.getElementById("whoName");
  var whoRebirth = document.getElementById("whoRebirth");
  var whoFlash = document.getElementById("whoFlash");
  var whoDescend = document.getElementById("whoDescend");
  var whoTimers = [];

  // durasi (ms) tiap tahap - disamakan sama transition opacity
  // 1.2s di CSS (.who-bg-layer) supaya fade-nya benar-benar
  // selesai sebelum tahap berikutnya jalan
  var WHO_FADE_MS = 1200;
  var WHO_FALL_MS = 900;
  var WHO_HOLD_BLACK_MS = 900;
  var WHO_HOLD_BLACK_2_MS = 700;

  var WHO_QUESTION = "who are you??";
  var WHO_TYPE_MS = 90; // kecepatan ketik per huruf
  var WHO_REBIRTH_DELAY_MS = 2800; // jeda sebelum tombol rebirth muncul
  var WHO_FLASH_TO_HOME_MS = 650; // saat layar paling terang -> pindah ke hero
  var WHO_FLASH_TOTAL_MS = 1600;

  function isWhoOpen() {
    return whoPage.classList.contains("is-active");
  }

  function clearWhoTimers() {
    whoTimers.forEach(function (t) {
      clearTimeout(t);
    });
    whoTimers = [];
  }

  // ganti src background - HANYA dipanggil selagi layer sedang
  // tidak kelihatan (opacity 0), supaya tidak ada "pop"
  function setWhoBgSrc(url) {
    whoBg.style.backgroundImage = "url('" + url + "')";
  }

  // munculkan/hilangkan background layer secara instan, tanpa
  // animasi (dipakai sekali pas who-page pertama dibuka)
  function setWhoBgInstant(visible) {
    whoBg.style.transition = "none";
    whoBg.classList.toggle("is-visible", visible);
    void whoBg.offsetWidth;
    whoBg.style.transition = "";
  }

  // reset ke kondisi awal tiap kali who-page dibuka lagi, biar
  // sequence-nya selalu bisa diulang dari scene 1
  function resetWhoSequence() {
    clearWhoTimers();
    whoScene1.classList.remove("is-falling");
    whoScene1.classList.add("is-active");
    whoScene2.classList.remove("is-active");
    whoScene3.classList.remove("is-active", "is-live", "is-rebirth-ready");
    whoWord.classList.remove("is-leaving");
    whoForm.classList.remove("is-ready");
    whoInput.value = "";
    whoInput.classList.remove("is-shaking");
    whoTyped.textContent = "";
    whoName.textContent = "";
    setWhoBgSrc("img/kuburan.png");
    setWhoBgInstant(true); // kuburan.png langsung kelihatan
  }

  function openWho() {
    if (isOpen()) closeNewLanding();
    if (isArticleOpen()) closeArticle();
    resetWhoSequence();
    whoPage.classList.add("is-active");
    whoPage.setAttribute("aria-hidden", "false");
    body.classList.add("on-who");
    if (navWho) navWho.classList.add("is-current");
  }

  function closeWho() {
    clearWhoTimers();
    whoPage.classList.remove("is-active");
    whoPage.setAttribute("aria-hidden", "true");
    body.classList.remove("on-who");
    if (navWho) navWho.classList.remove("is-current");
  }

  // efek mesin ketik untuk "who are you??", lalu munculkan
  // input nama setelah selesai
  function whoTypeQuestion() {
    whoTyped.textContent = "";
    var i = 0;
    function step() {
      i += 1;
      whoTyped.textContent = WHO_QUESTION.slice(0, i);
      if (i < WHO_QUESTION.length) {
        whoTimers.push(setTimeout(step, WHO_TYPE_MS));
      } else {
        whoTimers.push(
          setTimeout(function () {
            whoForm.classList.add("is-ready");
            whoInput.focus();
          }, 450),
        );
      }
    }
    whoTimers.push(setTimeout(step, 350));
  }

  // scene 1 -> scene 2: kartu "jatuh" (0.9s), lalu background
  // kuburan.png FADE OUT ke hitam (teks mulai diketik bareng
  // mulainya fade out ini), tahan sebentar di hitam polos, baru
  // background penjaga.png FADE IN dari hitam. Setelah itu
  // menunggu user mengetik nama dan menekan Enter.
  function whoStartDescend() {
    if (whoScene1.classList.contains("is-falling")) return;
    whoScene1.classList.add("is-falling");

    whoTimers.push(
      setTimeout(function () {
        whoScene1.classList.remove("is-active");
        whoScene1.classList.remove("is-falling");

        whoScene2.classList.add("is-active");
        whoBg.classList.remove("is-visible"); // kuburan.png fade out ke hitam
        whoTypeQuestion(); // mulai efek mengetik "who are you??"

        whoTimers.push(
          setTimeout(function () {
            // sekarang sudah hitam total; ganti src selagi
            // tidak kelihatan, lalu fade in
            setWhoBgSrc("img/who.png");
            whoBg.classList.add("is-visible"); // penjaga.png fade in
          }, WHO_FADE_MS + WHO_HOLD_BLACK_MS),
        );
      }, WHO_FALL_MS),
    );
  }

  // scene 2 -> scene 3: dipanggil setelah user submit nama.
  // Kata "who are you??" larut, background penjaga.png FADE OUT
  // ke hitam bareng-bareng, tahan sebentar di hitam, baru
  // ending.jpg FADE IN sambil scene 3 aktif dan menampilkan
  // nama + animasi "game over", lalu tombol rebirth muncul.
  function whoGoToWelcome(name) {
    whoName.textContent = name;
    whoForm.classList.remove("is-ready");
    whoInput.blur();
    whoWord.classList.add("is-leaving");
    whoBg.classList.remove("is-visible"); // penjaga.png fade out ke hitam

    whoTimers.push(
      setTimeout(function () {
        whoScene2.classList.remove("is-active");
        whoScene3.classList.add("is-active");
        void whoScene3.offsetWidth; // paksa reflow biar animasi selalu jalan
        whoScene3.classList.add("is-live");

        whoTimers.push(
          setTimeout(function () {
            setWhoBgSrc("img/end.png");
            whoBg.classList.add("is-visible"); // ending.jpg fade in
          }, WHO_HOLD_BLACK_2_MS),
        );

        whoTimers.push(
          setTimeout(function () {
            whoScene3.classList.add("is-rebirth-ready");
          }, WHO_REBIRTH_DELAY_MS),
        );
      }, WHO_FADE_MS),
    );
  }

  // rebirth: kilatan cahaya lalu balik ke hero section
  function whoDoRebirth() {
    if (whoFlash.classList.contains("is-firing")) return;
    whoFlash.classList.remove("is-firing");
    void whoFlash.offsetWidth;
    whoFlash.classList.add("is-firing");

    // sengaja TIDAK dimasukkan ke whoTimers: closeWho() akan
    // memanggil clearWhoTimers(), dan flash ini harus tetap
    // berjalan sampai selesai meski who-page sudah ditutup.
    setTimeout(function () {
      closeWho();
    }, WHO_FLASH_TO_HOME_MS);

    setTimeout(function () {
      whoFlash.classList.remove("is-firing");
    }, WHO_FLASH_TOTAL_MS);
  }

  if (navWho) {
    navWho.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isWhoOpen()) openWho();
    });
  }
  if (whoBack) whoBack.addEventListener("click", closeWho);
  if (whoDescend) whoDescend.addEventListener("click", whoStartDescend);

  // Enter di input nama -> lanjut ke scene 3
  if (whoForm) {
    whoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = whoInput.value.trim();
      if (!name) {
        whoInput.classList.remove("is-shaking");
        void whoInput.offsetWidth;
        whoInput.classList.add("is-shaking");
        return;
      }
      whoGoToWelcome(name);
    });
  }

  if (whoRebirth) whoRebirth.addEventListener("click", whoDoRebirth);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (detailPage.classList.contains("is-active")) closeDetail();
    else if (isArticleOpen()) closeArticle();
    else if (isWhoOpen()) closeWho();
    else if (isOpen()) closeNewLanding();
  });
});
