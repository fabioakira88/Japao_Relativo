/* Keep article context readable when an image provider is unavailable. */
(function () {
  function unavailable(image) {
    if (!image || image.dataset.jrImageState || !image.getAttribute('src')) return;
    image.dataset.jrImageState = 'unavailable';
    var message = document.createElement('p');
    message.className = 'jr-image-unavailable';
    message.textContent = 'Imagem indisponível.' + (image.alt ? ' ' + image.alt : '');
    message.style.cssText = 'padding:16px;border:1px solid #DDD8D0;font:inherit;line-height:1.5;overflow-wrap:anywhere';
    image.style.display = 'none';
    image.insertAdjacentElement('afterend', message);
  }
  document.addEventListener('error', function (event) {
    if (event.target instanceof HTMLImageElement) unavailable(event.target);
  }, true);
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('img[src]').forEach(function (image) {
      if (image.complete && !image.naturalWidth) unavailable(image);
    });
  });
})();
