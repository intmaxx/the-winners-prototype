// Keeps the director/teacher view choice across pages (prototype only).
(function () {
  var KEY = 'tw-role', OWNER = '원장으로 보기', TEACHER = '강사로 보기';
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var want = new URLSearchParams(location.search).get('role') || load();
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button');
    if (!b) return;
    var t = b.textContent.trim();
    if (t === TEACHER) save('teacher'); else if (t === OWNER) save('owner');
  }, true);
  if (want !== 'teacher') return;
  document.documentElement.style.visibility = 'hidden';
  var tries = 0, timer = setInterval(function () {
    var btn = Array.prototype.find.call(document.querySelectorAll('button'), function (x) { return x.textContent.trim() === TEACHER; });
    if (btn || ++tries > 60) {
      clearInterval(timer);
      if (btn) { btn.click(); save('teacher'); }
      requestAnimationFrame(function () { document.documentElement.style.visibility = ''; });
    }
  }, 50);
})();
