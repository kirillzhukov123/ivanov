(function() {
  var items = [
    { id: 1, title: "CASCATE DI TIVOLI", year: 1761, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 1.png" },
    { id: 2, title: "PORTRAIT OF VINCENT VAN GOGH", year: 1886, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 2.png" },
    { id: 3, title: "UNEQUAL MARRIAGE", year: 1862, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 3.png" },
    { id: 4, title: "THE HAPPY VIOLINIST", year: 1624, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 4.png" },
    { id: 5, title: "THE ARCADIAN", year: 1834, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 5.png" },
    { id: 6, title: "GOLFO DI NAPOLI", year: 1845, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "img/image 6.png" }
  ];

  var scheme = 'light';
  var panelOpen = false;
  var searchQuery = '';

  function clean(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function drawHeader() {
    var icon = scheme === 'light' ? '<img src="img/dark_icon.png" style="width:20px;height:20px;">' : '<img src="img/icon_btn.png" style="width:20px;height:20px;">';
    document.getElementById('siteheader').innerHTML = '<div class="header-container"><h1 class="logo h1"></h1><button class="theme-toggle" id="themeToggleBtn">' + icon + '</button></div>';
    document.getElementById('themeToggleBtn').onclick = function() {
      scheme = scheme === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('dark', scheme === 'dark');
      localStorage.setItem('colorMode', scheme);
      drawAll();
    };
  }

  function drawSearch() {
    var icon = scheme === 'light' ? '<img src="img/filter_icon-red.png">' : '<img src="img/filter_icon.png">';
    document.getElementById('searchbar').innerHTML = '<div class="search-filter-container"><div class="search-wrapper"><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="22" y1="22" x2="16.65" y2="16.65"></line></svg><input type="text" class="search-input" placeholder="Painting title" id="global-search"></div><button class="burger-btn" id="burgerMenuBtn">' + icon + '</button></div>';

    document.getElementById('burgerMenuBtn').onclick = function() {
      panelOpen = !panelOpen;
      drawAll();
    };

    var input = document.getElementById('global-search');
    input.oninput = function() {
      searchQuery = this.value;
      drawGallery();
    };
  }

  function drawPanel() {
    var panel = document.getElementById('filterpanel');
    if (!panelOpen) { panel.style.display = 'none'; return; }
    panel.style.display = 'flex';

    var artists = [];
    var locations = [];
    items.forEach(function(item) {
      if (artists.indexOf(item.artist) === -1) artists.push(item.artist);
      if (locations.indexOf(item.location) === -1) locations.push(item.location);
    });

    panel.innerHTML = '<div class="filter-sidebar"><div class="filter-sidebar-header"><button class="close-filter" id="closePanelBtn">✕</button></div><div class="filter-group"><label class="filter-label caption-bold-12">ARTIST</label><div class="select-container" id="artistSelect"><div class="filter-select-trigger"><span>Select the artist</span><div class="arrow-icon"></div></div><div class="filter-options-list"><div class="filter-option">All artists</div>' + artists.map(function(a) { return '<div class="filter-option">' + clean(a) + '</div>'; }).join('') + '</div></div></div><div class="filter-group"><label class="filter-label caption-bold-12">LOCATION</label><div class="select-container" id="locationSelect"><div class="filter-select-trigger"><span>Select the location</span><div class="arrow-icon"></div></div><div class="filter-options-list"><div class="filter-option">All locations</div>' + locations.map(function(l) { return '<div class="filter-option">' + clean(l) + '</div>'; }).join('') + '</div></div></div><div class="filter-group"><label class="filter-label caption-bold-12">YEARS</label><div class="years-inputs"><input type="number" placeholder="From"><input type="number" placeholder="To"></div></div><div class="filter-sidebar-footer"><button class="btn-show">SHOW THE RESULTS</button><button class="btn-clear">CLEAR</button></div></div>';

    document.getElementById('closePanelBtn').onclick = function() { panelOpen = false; drawAll(); };
    panel.onclick = function(e) { if (e.target === panel) { panelOpen = false; drawAll(); } };

    document.getElementById('artistSelect').querySelector('.filter-select-trigger').onclick = function(e) {
      e.stopPropagation();
      document.getElementById('artistSelect').classList.toggle('open');
    };
    document.getElementById('locationSelect').querySelector('.filter-select-trigger').onclick = function(e) {
      e.stopPropagation();
      document.getElementById('locationSelect').classList.toggle('open');
    };

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.select-container')) {
        document.querySelectorAll('.select-container.open').forEach(function(c) { c.classList.remove('open'); });
      }
    });
  }

function drawGallery() {
  var grid = document.getElementById('gallery');
  var pag = document.getElementById('decorpag');

  if (searchQuery) {
    grid.style.display = 'flex';
    grid.style.alignItems = 'center';
    grid.style.justifyContent = 'center';
    grid.style.minHeight = '60vh';
    grid.innerHTML = '<div class="empty-gallery">No matches for ' + clean(searchQuery) + '<br>Please try again with a different spelling or keywords.</div>';
    pag.style.display = 'none';
    return;
  }

  grid.style.display = '';
  grid.style.alignItems = '';
  grid.style.justifyContent = '';
  grid.style.minHeight = '';
  pag.style.display = '';
  
  grid.innerHTML = items.map(function(item) {
    return '<div class="art-card"><div class="card-image"><img src="' + item.image + '" alt="' + clean(item.title) + '" loading="lazy"></div><div class="card-content"><div class="content-flex-wrapper"><div class="text-container"><div class="text-wrapper"><div class="state-default"><div class="painting-title">' + clean(item.title) + '</div><div class="painting-year">' + item.year + '</div></div><div class="state-hover"><div class="painting-title uppercase">' + clean(item.artist) + '</div><div class="painting-year uppercase">' + clean(item.location) + '</div></div></div></div><div class="mobile-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div></div></div></div>';
  }).join('');

  pag.innerHTML = scheme === 'light' ? '<img src="img/pag-light.png">' : '<img src="img/pag.png">';
}

  function drawAll() {
    drawHeader();
    drawSearch();
    drawPanel();
    drawGallery();
  }

  var saved = localStorage.getItem('colorMode');
  if (saved === 'dark') {
    scheme = 'dark';
    document.body.classList.add('dark');
  }

  drawAll();
})();