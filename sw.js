/* Служебный скрипт. Нужен, чтобы Chrome считал страницу настоящим приложением
   и предлагал «Установить», а не «Создать ярлык».

   Кэш НЕ ведём намеренно: программа обновляется часто, а закэшированная
   старая версия — худшее, что может случиться с расчётами. Сеть всегда
   первична; если её нет, показываем понятную заглушку. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () {
    return new Response(
      '<meta charset="utf-8"><body style="background:#0d0f14;color:#e8ecf4;'
      + 'font:16px -apple-system,Roboto,sans-serif;display:flex;align-items:center;'
      + 'justify-content:center;height:100vh;margin:0;text-align:center">'
      + 'Нет интернета.<br>Данные на месте — открой снова, когда появится связь.</body>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
