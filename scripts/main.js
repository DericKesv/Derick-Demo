const weapons = [];

function addWeapon(name, type, metaStatus, imageName, attachments) {
  weapons.push({ name, type, metaStatus, imageName, attachments });
  createWeaponCard(name, type, metaStatus, imageName, attachments);
}

function createWeaponCard(name, type, metaStatus, imageName, attachments) {
  const weaponId = name.toLowerCase().replace(/ /g, "-");
  const card = document.createElement("div");
  card.className = "weapon";

  card.innerHTML = `
    <img src="assets/images/${imageName}" alt="${name}">
    <div class="weapon-title" onclick="toggleAttachments('${weaponId}-attachments')">
      ${name} <span class="weapon-type">${type}</span>
      <span class="meta-tag ${metaStatus}">${metaStatus === "meta" ? "Meta" : "No Meta"}</span>
    </div>
    <div class="attachments" id="${weaponId}-attachments">
      ${attachments.map(att => `
        <div class="attachment">
          ${att.name}
          ${att.level ? `<span class="attachment-level">🔒 Nivel ${att.level}</span>` : ""}
        </div>
      `).join("")}
    </div>
  `;

  document.querySelector(".weapon-list").appendChild(card);
}

function toggleAttachments(id) {
  const element = document.getElementById(id);
  element.classList.toggle("expanded");
}

function filterWeapons() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  const weaponCards = document.querySelectorAll(".weapon");

  weaponCards.forEach(card => {
    const name = card.querySelector(".weapon-title").textContent.toLowerCase();
    const type = card.querySelector(".weapon-type").textContent;

    const matchesSearch = name.includes(search);
    const matchesCategory = category === "Todas" || category === type;

    card.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
  });
}

// Armas de ejemplo
addWeapon("HDR", "Rifle de precisión", "meta", "hdr.png", [
  { name: "Monolithic Suppressor", level: 0 },
  { name: "Gain-Twist Barrel", level: 13 },
  { name: "Lightweight Bipod", level: 3 },
  { name: "Combat Stock", level: 37 },
  { name: "108MM Overpressured", level: 9 }
]);

addWeapon("AK-74", "Rifle de asalto", "meta", "ak74.png", [
  { name: "Compensador", level: 10 },
  { name: "Mira reflectora táctica", level: 15 },
  { name: "Culata reforzada", level: 25 }
]);
