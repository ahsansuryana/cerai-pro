function getCurrentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

function requireAuth() {
  if (!Storage.isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

function redirectIfLoggedIn() {
  if (Storage.isLoggedIn()) {
    window.location.href = 'dashboard.html';
  }
}

function logout() {
  Storage.logout();
}

document.addEventListener('DOMContentLoaded', function () {
  const page = getCurrentPage();

  if (page === 'dashboard.html') {
    requireAuth();
    if (typeof initDashboard === 'function') initDashboard();
  } else if (page === 'chat.html') {
    requireAuth();
    if (typeof initChat === 'function') initChat();
  } else if (page === 'rating.html') {
    requireAuth();
    if (typeof initRating === 'function') initRating();
  } else if (page === 'login.html') {
    redirectIfLoggedIn();
    if (typeof initLogin === 'function') initLogin();
  }
});
