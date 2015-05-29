  </main>

  <footer class="Footer" role="contentinfo">
    <div class="Wrapper">
      <div class="Footer-inner">
        <ul class="Footer-contact">
          <li class="Footer-contactItem"><a href="mailto:info@whattookyousolong.org">info@whattookyousolong.org</a>
          <li class="Footer-contactItem"><a href="https://www.facebook.com/WhatTookYouSoLong" target="_blank">Like us on Facebook</a>
          <li class="Footer-contactItem"><a href="https://twitter.com/wtysl" target="_blank">Follow us on Twitter</a>
          <li class="Footer-contactItem"><a href="https://instagram.com/wtysl/" target="_blank">Follow us on Instagram</a>
        </ul>

        <div class="Footer-newsletter">
          <h3>Subscribe to our newsletter</h3>

          <p>Text about why the newsletter is a good thing to recive.</p>

          <?php echo include_partial("partials/newsletter_form", array("id" => "footer")); ?>
        </div>
      </div>
    </div>
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
