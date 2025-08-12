fetch('header.html')
  .then(response => {
    if (!response.ok) throw new Error('مشکل در بارگذاری هدر');
    return response.text();
  })
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  })
  .catch(error => {
    console.error('خطا:', error);
  });
