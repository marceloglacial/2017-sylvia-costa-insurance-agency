<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="index, follow">

    <!-- Viewport for responsive web design -->
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

    <!-- INFO -->
    <title><?php bloginfo('name'); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>"
    />
    <meta name="keywords" content="<?php bloginfo('name'); ?>, insurance, agency, auto, home, business" />

    <!-- Recommended favicon format -->
    <link rel="icon" type="<?php bloginfo('template_url'); ?>/image/png" href="favicon.png">

    <!-- Apple Touch Icon (at least 200x200px) -->
    <link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/tile.png">

    <!-- To run web application in full-screen -->
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- Status Bar Style (see Supported Meta Tags below for available values) -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <!-- Microsoft Tiles -->
    <meta name="msapplication-config" content="<?php bloginfo('template_url'); ?>/browserconfig.xml" />

    <!-- SOCIAL -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://sfcostains.com">
    <meta property="og:title" content="<?php bloginfo('name'); ?>">
    <meta property="og:image" content="<?php bloginfo('template_url'); ?>/tile-wide.png">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
    <meta property="og:locale" content="en_US">

    <!-- STYLES -->
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/vendor/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/css/styles.css">

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,700" rel="stylesheet">

    <?php wp_head(); ?> 
</head>

<body>
    <div id="wrapper" class="container-fluid">
        <header id="top" class="row">
            <div id="logo" class="col-xs-10 col-md-8">
                <h1><?php bloginfo('name'); ?></h1>
            </div>
            <!-- /logo -->
            <div id="services" class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                <?php
                    if (is_home()) {
                        wp_nav_menu(array(
                            'menu'             => 'Services',
                            'container_id'     => 'navbar-services',
                            'menu_class'       => 'nav',
                            'before'           => '<span>',
                            'after'            => '</span>'
                        ));
                    };
                ?>
            </div>
            <!-- /services -->
        </header>
        <main>
            <section id="about-us">
                <div id="moto" class="row">
                    <article class="col-xs-10 col-md-8">
                        <?php
                            // query for the about page
                            $your_query = new WP_Query( 'pagename=about-us' );
                            // "loop" through query (even though it's just one page)
                            while ( $your_query->have_posts() ) : $your_query->the_post();
                        ?>
                        <h2><?php the_title();?></h2>
                        <p><?php the_content();?></p>
                        <?php
                            endwhile;
                            // reset post data (important!)
                            wp_reset_postdata();
                        ?>
                    </article>
                </div>
                <!-- /moto -->
                <div id="team" class="row">
                    <?php
                    $pgname = get_page_by_title('Team');
                    $args = array(
                        'post_parent' => $pgname->ID,
                        'post_type' => 'page',
                        'order' => 'ASC',
                        // 'orderby' => 'title'
                    );

                    $child_query = new WP_Query( $args );
                    ?>

                    <?php while ( $child_query->have_posts() ) : $child_query->the_post(); ?>
                    <figure class="col-lg-6">
                        <?php if ( has_post_thumbnail() ) { the_post_thumbnail('page-thumb'); } else {?><img src="<?php bloginfo('template_url'); ?>/assets/img/card-photo.png" alt="Card Photo" class="img-responsive"><?php } ?>
                        <figcaption>
                            <h3><?php the_title(); ?></h3>
                            <p><?php the_content(); ?></p>
                        </figcaption>
                    </figure>

                    <?php endwhile; ?>

                    <?php
                    wp_reset_postdata();
                    ?>
                </div>
                <!-- /team -->
            </section>
            <!-- /about-us -->
            <section id="contact-us">
                <div id="form" class="row">
                    <?php
                            // query for the about page
                            $your_query = new WP_Query( 'pagename=contact-us' );
                            // "loop" through query (even though it's just one page)
                            while ( $your_query->have_posts() ) : $your_query->the_post();
                    ?>
                    <h2><?php the_title();?></h2>
                    <?php the_content();?>
                    <?php
                        endwhile;
                        // reset post data (important!)
                        wp_reset_postdata();
                    ?>    
                    <span class="clearfix"></span>
                </div>
                <!-- /form -->
                <div id="map" class="row">
                    <h2><?php the_title(); ?></h2>
                    <div class="embed-responsive embed-responsive-16by9">
                        <?php
                            // query for the about page
                            $your_query = new WP_Query( 'pagename=map' );
                            // "loop" through query (even though it's just one page)
                            while ( $your_query->have_posts() ) : $your_query->the_post();
                        ?>
                        <p><?php the_content();?></p>
                        <?php
                            endwhile;
                            // reset post data (important!)
                            wp_reset_postdata();
                        ?>
                    </div>
                </div>
                <!-- /map -->
                <div id="business-card" itemscope itemtype="http://schema.org/LocalBusiness" class="row">
                    <address class="col-md-6">
                        <?php
                            // query for the about page
                            $your_query = new WP_Query( 'pagename=business-card' );
                            // "loop" through query (even though it's just one page)
                            while ( $your_query->have_posts() ) : $your_query->the_post();
                        ?>
                            <img itemprop="image" src="<?php bloginfo('template_url'); ?>/assets/img/logo-dark.png" alt="Company Logo" class="img-responsive">
                            <strong itemprop="name"><?php bloginfo('name'); ?></strong>
                            <p>
                                <span itemprop="address"><?php echo get_post_meta($post->ID, 'address', true); ?></span>
                                <br/>
                                <span itemprop="telephone">
                                    <a href="tel:<?php echo get_post_meta($post->ID, 'telephone', true); ?>">Tel: <?php echo get_post_meta($post->ID, 'telephone', true); ?></a>
                                </span> /
                                <a href="tel:<?php echo get_post_meta($post->ID, 'fax', true); ?>">Fax: <?php echo get_post_meta($post->ID, 'fax', true); ?></a>
                                <br/>
                                <a href="mailto:<?php echo get_post_meta($post->ID, 'email', true); ?>"><span itemprop="email"><?php echo get_post_meta($post->ID, 'email', true); ?></span></a>
                            </p>
                        <?php
                            endwhile;
                            // reset post data (important!)
                            wp_reset_postdata();
                        ?>
                    </address>
                </div>
                <!-- /business-card -->
            </section>
            <!-- contact-us -->
        </main>
        <footer class="row">
            <?php
                if (is_home()) {
                    wp_nav_menu(array(
                        'menu'             => 'Footer',
                        'container_id'     => 'navbar-footer',
                        'menu_class'       => 'nav'
                    ));
                };
            ?>
            <div id="dev">
                <a href="http://marceloglacial.com/" title="developed by Marcelo Glacial">marceloglacial.com</a>
            </div>
        </footer>
    </div>
    <!-- /wrapper -->

    <!-- SCRIPTS -->
    <script async src="<?php bloginfo('template_url'); ?>/vendor/js/jquery.min.js"></script>
    <script async src="<?php bloginfo('template_url'); ?>/vendor/js/bootstrap.min.js"></script>
    <script async src="<?php bloginfo('template_url'); ?>/assets/js/main.js"></script>
    <?php wp_footer(); ?>
</body>

</html>