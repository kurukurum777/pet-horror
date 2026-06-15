"use strict";

fetch("/api/pets")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("list");
    data.forEach(pet => {
      const li = document.createElement("li");
      // html ではなく、キレイなURL形式に変更
      li.innerHTML = `<a href="/pet/${pet.id}">${pet.name}</a>`;
      list.appendChild(li);
    });
  });