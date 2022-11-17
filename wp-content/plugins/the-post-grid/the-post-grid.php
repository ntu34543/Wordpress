<?php
/**
 * Plugin Name: The Post Grid
 * Plugin URI: http://demo.radiustheme.com/wordpress/plugins/the-post-grid/
 * Description: Fast & Easy way to display WordPress post in Grid, List & Isotope view ( filter by category, tag, author..)  without a single line of coding.
 * Author: RadiusTheme
 * Version: 4.2.3
 * Text Domain: the-post-grid
 * Domain Path: /languages
 * Author URI: https://radiustheme.com/
 *
 * @package RT_TPG
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'This script cannot be accessed directly.' );
}

define( 'RT_THE_POST_GRID_VERSION', '4.2.3' );
define( 'RT_THE_POST_GRID_AUTHOR', 'RadiusTheme' );
define( 'RT_THE_POST_GRID_NAME', 'The Post Grid' );
define( 'RT_THE_POST_GRID_PLUGIN_FILE', __FILE__ );
define( 'RT_THE_POST_GRID_PLUGIN_PATH', dirname( __FILE__ ) );
define( 'RT_THE_POST_GRID_PLUGIN_ACTIVE_FILE_NAME', plugin_basename( __FILE__ ) );
define( 'RT_THE_POST_GRID_PLUGIN_URL', plugins_url( '', __FILE__ ) );
define( 'RT_THE_POST_GRID_PLUGIN_SLUG', basename( dirname( __FILE__ ) ) );
define( 'RT_THE_POST_GRID_LANGUAGE_PATH', dirname( plugin_basename( __FILE__ ) ) . '/languages' );

if ( ! class_exists( 'rtTPG' ) ) {
	require_once 'app/RtTpg.php';
}