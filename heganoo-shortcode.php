<?php
/*
Plugin Name: Listen Shortcode
Description: Enables shortcode to embed Inline Audio Player
Version: 1.0
License: GPLv2
Author: Konforti
Author URI: http://konforti.net
*/

/**
 * Implements add_shortcode.
 *
 * @param      $atts
 * @param null $content
 *
 * @return string
 */
function listenEmbedJS( $atts, $content = null ) {

	// Set default values.
	extract( shortcode_atts( array(
			'src'   => '',
			'start' => '',
			'end'   => '',
	), $atts ) );

	if ( ! $src ) {

		// The src is mandatory.
		$error = "
		<div style='border: 20px solid red; border-radius: 40px; padding: 40px; margin: 50px 0 70px;'>
			<h3>Uh oh!</h3>
			<p style='margin: 0;'>Something is wrong with your Listen shortcode.
		</div>";

		return $error;

	} else {

		// Set the output.
		$output = "";
		$output .= "<span class='listen-node' data-src='$src' data-start='$start' data-end='$end'>$content</span>\n";
		$output .= "<script>(function(d,s,id){var js, fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src='http://konforti.net/listen/listen.js';fjs.parentNode.insertBefore(js,fjs);})(document,'script','listen-embed');</script>\n";

		return $output;
	}
}

/**
 * Register Heganoo shortcode.
 */
add_shortcode( 'listen', 'listenEmbedJS' );