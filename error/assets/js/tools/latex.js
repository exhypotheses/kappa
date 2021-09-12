/* 
    http://docs.mathjax.org/en/latest/web/start.html
    http://docs.mathjax.org/en/latest/web/components/index.html#web-components
    http://docs.mathjax.org/en/latest/web/start.html#configuring-mathjax
*/

window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;
  document.head.appendChild(script);
})();