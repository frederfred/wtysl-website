  </main>

  <div class="Wrapper">
    <footer class="Footer">
      <span class="Footer-text Footer-text--before"><?php echo get_option('footer-text-1'); ?></span>

      <img src="<?php bloginfo("template_url"); ?>/public/assets/images/logotype-minimal.svg" alt='"What Took You So Long?" minimal logotype' class="Footer-logotype">

      <span class="Footer-text Footer-text--after"><?php echo get_option('footer-text-2'); ?></span>
    </footer>
  </div>

  <?php if (getenv("WP_ENV") === "production"): ?>
    <script>
      var _gaq=[['_setAccount','UA-XXXXXXXX-1'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
      s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
  <?php endif; ?>

  <script src="<?php bloginfo("template_url"); ?>/public/assets/javascripts/application<?php echo minified_extension(); ?>.js?v=<?php echo get_asset_version(); ?>"></script>
  </body>
</html>
