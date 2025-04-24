const weapons = [
    { id: "hdr", name: { es: "HDR", en: "HDR" }, type: { es: "Rifle de precisión", en: "Precision Rifle" }, meta: "meta" },
    { id: "ak74", name: { es: "AK-74", en: "AK-74" }, type: { es: "Rifle de asalto", en: "Assault Rifle" }, meta: "meta" }
  ];
  
  const lang = {
    es: {
      title: "🔥 ARMAMENTOS DE WARZONE 🔥",
      highlight: "LISTA ACTUALIZADA DE ARMAS META",
      meta: "Meta",
      nonMeta: "No Meta",
      creatorInfo: "Página creada por <strong>@DericKesv</strong> · Sígueme en:",
      searchPlaceholder: "Buscar arma...",
      ttk: "Ver TIME TO KILL",
      filterCategory: {
        all: "Todas las categorías",
        precisionRifle: "Rifle de precisión",
        assaultRifle: "Rifle de asalto"
      }
    },
    en: {
      title: "🔥 WARZONE LOADOUTS 🔥",
      highlight: "UPDATED META WEAPONS LIST",
      meta: "Meta",
      nonMeta: "Non Meta",
      creatorInfo: "Page created by <strong>@DericKesv</strong> · Follow me on:",
      searchPlaceholder: "Search for weapon...",
      ttk: "View TIME TO KILL",
      filterCategory: {
        all: "All categories",
        precisionRifle: "Precision Rifle",
        assaultRifle: "Assault Rifle"
      }
    }
  };
  
  let currentLang = "es";
  let currentAttachmentsCount = 5;
  
  function changeLanguage() {
    currentLang = document.getElementById("languageSelect").value;
    updateLanguage();
  }
  
  function updateLanguage() {
    const l = lang[currentLang];
    document.getElementById("main-title").textContent = l.title;
    document.getElementById("highlight").textContent = l.highlight;
    document.getElementById("searchInput").placeholder = l.searchPlaceholder;
    document.getElementById("categorySelect").innerHTML = `
      <option value="Todas">${l.filterCategory.all}</option>
      <option value="Rifle de precisión">${l.filterCategory.precisionRifle}</option>
      <option value="Rifle de asalto">${l.filterCategory.assaultRifle}</option>
    `;
    document.querySelector(".creator-info").innerHTML = l.creatorInfo + 
      `<a href="https://tiktok.com/@DericKesv" target="_blank">TikTok</a> |
       <a href="https://twitch.tv/DericKesv" target="_blank">Twitch</a> |
       <a href="https://instagram.com/DericKesv" target="_blank">Instagram</a>`;
    document.querySelector(".weapon-list").innerHTML = "";
    weapons.forEach(w => createWeaponCard(w.id, w.name[currentLang], w.type[currentLang], w.meta));
  }
  
  function createWeaponCard(id, name, type, metaStatus) {
    const card = document.createElement("div");
    card.className = "weapon";
    card.innerHTML = `
      <img src="assets/images/${id}.png" alt="${name}">
      <div class="weapon-title" onclick="toggleAttachments('${id}-attachments')">
        ${name} <span class="weapon-type">${type}</span>
        <span class="meta-tag ${metaStatus}">${metaStatus === "meta" ? lang[currentLang].meta : lang[currentLang].nonMeta}</span>
      </div>
      <div class="attachments" id="${id}-attachments">
        <div class="attachments-buttons">
          <button class="attachments-button active" onclick="toggleAttachmentsCount('${id}', 5)">${lang[currentLang].meta}</button>
          <button class="attachments-button" onclick="toggleAttachmentsCount('${id}', 8)">8 Accesorios</button>
        </div>
        <div class="attachment"><span class="attachment-name">Cargador: Cargador de 60 balas</span> <span class="attachment-level">Nivel 14</span></div>
        <div class="attachment"><span class="attachment-name">Mira: Mira térmica</span> <span class="attachment-level">Nivel 10</span></div>
        <div class="attachment"><span class="attachment-name">Culata: Culata larga</span> <span class="attachment-level">Nivel 12</span></div>
        <div class="attachment"><span class="attachment-name">Boca de fuego: Supresor de sonido</span> <span class="attachment-level">Nivel 15</span></div>
        <div class="attachment"><span class="attachment-name">Caño: Caño largo</span> <span class="attachment-level">Nivel 8</span></div>
        <div class="attachment"><span class="attachment-name">Empuñadura: Empuñadura ergonómica</span> <span class="attachment-level">Nivel 12</span></div>
        <div class="attachment"><span class="attachment-name">Laser: Laser verde</span> <span class="attachment-level">Nivel 20</span></div>
        <div class="attachment"><span class="attachment-name">Bajo caño: Empuñadura delantera</span> <span class="attachment-level">Nivel 10</span></div>
        <div class="ttk-link"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">${lang[currentLang].ttk}</a></div>
      </div>
    `;
    document.querySelector(".weapon-list").appendChild(card);
  }
  
  function toggleAttachments(id) {
    document.querySelectorAll(".attachments").forEach(att => {
      if (att.id !== id) att.classList.remove("expanded");
    });
    const element = document.getElementById(id);
    element.classList.toggle("expanded");
    toggleAttachmentsCount(id.replace("-attachments", ""), 5);
  }
  
  function toggleAttachmentsCount(id, count) {
    currentAttachmentsCount = count;
    const weaponCard = document.querySelector(`#${id}-attachments`);
    const buttons = weaponCard.querySelectorAll(".attachments-button");
    buttons.forEach(button => button.classList.remove("active"));
    buttons[count === 5 ? 0 : 1].classList.add("active");
    const accessories = weaponCard.querySelectorAll(".attachment");
    accessories.forEach((att, index) => {
      att.style.display = index < currentAttachmentsCount ? "flex" : "none";
    });
  }
  
  updateLanguage();
  