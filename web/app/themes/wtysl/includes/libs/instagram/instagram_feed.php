<?php

class InstagramFeed {
  /**
   * Get rendered template
   * @param string $user_id User ID
   * @param string $access_token Access token (http://jelled.com/instagram/access-token)
   * @param string $count Number of photos or videos to fetch
   * @param string $template Path to template
   * @return void
   */
  public function __construct($user_id, $access_token, $count, $template) {
    $this->template = $template;
    $this->endpoint = "https://api.instagram.com/v1/users/${user_id}/media/recent/?access_token=${access_token}&count=${count}";
  }

  /**
   * Get rendered template
   * @return string
   */
  public function render() {
    $data = $this->get_data($this->endpoint);

    return $this->render_template($data);
  }

  /**
   * Get json from url
   * @param string $url
   * @return json
   */
  private function get_data($url) {
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_TIMEOUT, 20);

    $result = curl_exec($curl);

    curl_close($curl);

    return json_decode($result);
  }

  /**
   * Get rendered template
   * @param json $data
   * @return string
   */
  private function render_template($data) {
    $file = $this->template;

    if (!file_exists($file)) {
      return null;
    }

    ob_start();

    include $file;

    $content = ob_get_contents();

    ob_end_clean();

    return $content;
  }
}
