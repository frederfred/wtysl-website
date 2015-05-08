  </main>

  <footer class="Footer">
    footer
  </footer>

  <?php if (getenv("WP_ENV") === "production"): ?>
    <script>
      var _gaq=[['_setAccount','UA-XXXXXXXX-1'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
      s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
  <?php endif; ?>

  </body>
</html>
