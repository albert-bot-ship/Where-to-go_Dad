// 地點對應表
const placeMap = {
  "苑裡修理廠":"https://maps.app.goo.gl/FGzsUjFPc8eKTaN97",
  "外埔檢驗廠":"https://maps.app.goo.gl/SkUH6Gc9WbccnAdD6",
  "台中慈濟":"https://maps.app.goo.gl/BJqKNiyrCCrxnsVk9",
  "清水順益":"https://maps.app.goo.gl/RkC8qkiQwyeMrraa9",
  "公司":"https://maps.app.goo.gl/W4SzgbNMNU2yFdLE8",
  "家":"https://maps.app.goo.gl/pdsiyFZep6NCo6bS6",
};

// 元件
const input = document.getElementById('location');
const suggestions = document.getElementById('suggestions');
const navigateBtn = document.getElementById('navigateBtn');

function navigateTo(location) {
  const url = placeMap[location] || `https://www.google.com/maps/search/?q=${encodeURIComponent(location)}`;
  window.open(url, '_blank');
}

// 搜尋建議
input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  suggestions.innerHTML = '';
  if (query) {
    const matches = Object.keys(placeMap).filter(place => place.toLowerCase().includes(query));
    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match;
      li.onclick = () => {
        input.value = match;
        suggestions.style.display = 'none';
        navigateTo(match);
      };
      suggestions.appendChild(li);
    });
    suggestions.style.display = matches.length ? 'block' : 'none';
  } else {
    suggestions.style.display = 'none';
  }
});

// 點擊搜尋按鈕
navigateBtn.addEventListener('click', () => {
  const location = input.value.trim();
  if (location) {
    navigateTo(location);
  } else {
    alert('請輸入地點名稱或網址');
  }
});

// 點擊字卡直接導航
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    const place = card.querySelector('p').textContent;
    navigateTo(place);
  });
});
