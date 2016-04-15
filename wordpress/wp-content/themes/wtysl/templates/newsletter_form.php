<form class="Newsletter" action="//whattookyousolong.<?php echo MAILCHIMP_DATACENTER; ?>.list-manage.com/subscribe/post?u=<?php echo MAILCHIMP_USER; ?>&amp;id=<?php echo MAILCHIMP_ID; ?>" method="post">
  <h3 class="Headline Headline--3">Subscribe to our newsletter</h3>

  <div class="Newsletter-inputWrapper">
    <label class="u-visuallyhidden" for="newsletter-email">Email:</label>

    <input class="Newsletter-input" id="newsletter-email" type="email" name="EMAIL" placeholder="E-mail" required="required">

    <?php # real people should not fill this in and expect good things - do not remove this or risk form bot signups ?>
    <div class="u-visuallyhidden">
      <input class="u-visuallyhidden" type="text" name="b_<?php echo MAILCHIMP_USER; ?>_<?php echo MAILCHIMP_ID; ?>" tabindex="-1" value="">
    </div>

    <input class="Newsletter-submit" type="submit" value="→" name="subscribe">
  </div>
</form>
