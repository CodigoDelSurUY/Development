<?php

/**
* This sample app is provided to kickstart your experience using Facebook's
* resources for developers.  This sample app provides examples of several
* key concepts, including authentication, the Graph API, and FQL (Facebook
* Query Language). Please visit the docs at 'developers.facebook.com/docs'
* to learn more about the resources available to you
*/

// Provides access to app specific values such as your app id and app secret.
// Defined in 'AppInfo.php'
require_once('AppInfo.php');

// Enforce https on production
if (substr(AppInfo::getUrl(), 0, 8) != 'https://' && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
exit();
}

// This provides access to helper functions defined in 'utils.php'
require_once('utils.php');


/*****************************************************************************
*
* The content below provides examples of how to fetch Facebook data using the
* Graph API and FQL.  It uses the helper functions defined in 'utils.php' to
* do so.  You should change this section so that it prepares all of the
* information that you want to display to the user.
*
****************************************************************************/

require_once('sdk/src/facebook.php');

$facebook = new Facebook(array(
    'appId'  => AppInfo::appID(),
    'secret' => AppInfo::appSecret(),
    'sharedSession' => true,
    'trustForwarded' => true,
));

$user_id = $facebook->getUser();

if ($user_id) {
    try {
    // Fetch the viewer's basic information
    $basic = $facebook->api('/me');
} catch (FacebookApiException $e) {
    // If the call fails we check if we still have a user. The user will be
    // cleared if the error is because of an invalid accesstoken
    if (!$facebook->getUser()) {
        header('Location: '. AppInfo::getUrl($_SERVER['REQUEST_URI']));
        exit();
    }
}

// This fetches some things that you like . 'limit=*" only returns * values.
// To see the format of the data you are retrieving, use the "Graph API
// Explorer" which is at https://developers.facebook.com/tools/explorer/
$likes = idx($facebook->api('/me/likes?limit=4'), 'data', array());

// This fetches 4 of your friends.
$friends = idx($facebook->api('/me/friends?limit=4'), 'data', array());

// And this returns 16 of your photos.
$photos = idx($facebook->api('/me/photos?limit=16'), 'data', array());

// And this returns your albums.
$albums = idx($facebook->api('/me/albums?fields=name,link'), 'data', array());

// Here is an example of a FQL call that fetches all of your friends that are
// using this app
$app_using_friends = $facebook->api(array(
    'method' => 'fql.query',
    'query' => 'SELECT uid, name FROM user WHERE uid IN(SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user = 1'
    ));
}

// Fetch the basic info of the app that they are using
$app_info = $facebook->api('/'. AppInfo::appID());

$app_name = idx($app_info, 'name', '');

?>

<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />

        <title><?php echo he($app_name); ?></title>

        <link rel="stylesheet" href="stylesheets/screen.css" media="Screen" type="text/css" />
        <link rel="stylesheet" href="stylesheets/mobile.css" media="handheld, only screen and (max-width: 480px), only screen and (max-device-width: 480px)" type="text/css" />
        <link rel="stylesheet" href="stylesheets/styles.css" media="Screen" type="text/css" />

        <!--[if IEMobile]>
        <link rel="stylesheet" href="mobile.css" media="screen" type="text/css"  />
        <![endif]-->

        <!-- These are Open Graph tags.  They add meta data to your  -->
        <!-- site that facebook uses when your content is shared     -->
        <!-- over facebook.  You should fill these tags in with      -->
        <!-- your data.  To learn more about Open Graph, visit       -->
        <!-- 'https://developers.facebook.com/docs/opengraph/'       -->
        <meta property="og:title" content="<?php echo he($app_name); ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="<?php echo AppInfo::getUrl(); ?>" />
        <meta property="og:image" content="<?php echo AppInfo::getUrl('/logo.png'); ?>" />
        <meta property="og:site_name" content="<?php echo he($app_name); ?>" />
        <meta property="og:description" content="My first app" />
        <meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>" />

        <script type="text/javascript" src="/javascript/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="/javascript/facebookApp.js"></script>

        <script type="text/javascript" src="/javascript/general.js"></script>
        <script>
            var FacebookCommunications = FacebookApp.namespace("FacebookCommunications");

            FacebookApp.FacebookCommunications.appID = '<?php echo AppInfo::appID(); ?>';
            FacebookApp.SERVER_HTTP_HOST = '//<?php echo $_SERVER["HTTP_HOST"]; ?>';
        </script>
        <script type="text/javascript" src="/javascript/facebookCommunication.js"></script>

        <!--[if IE]>
          <script type="text/javascript">
            var tags = ['header', 'section'];
            while(tags.length)
              document.createElement(tags.pop());
          </script>
        <![endif]-->

    </head>
    <body>
        <div id="fb-root"></div>

        <?php

        if ($user_id) {

            $albums = $facebook->api('/me/albums?fields=id,name'); 
            $pictures = array();

            echo "<h1>Select an Album!!</h1>";
            echo "<ul class='albumList'>";

            foreach ($albums['data'] as $album) {

                $pics = $facebook->api('/'.$album['id'].'/photos?fields=source,picture,id');
                echo "<li class='albumName' id=" . $album['id'] . " onclick='albumSelected(event.target);'>";
                echo $album['name'];
                $pictures[$album['id']] = $pics['data'];
                echo "</li>";

            }

            echo "</ul>";

        ?>

        <script type="text/javascript">

        pictures = <?php echo json_encode($pictures); ?>;

        albumSelected = function (target) {
            var id, albumPictures, index, photoGalleryNode, imageNode;

            id = target.id;
            albumPictures = pictures[id];
            photoGalleryNode = document.getElementById('albumPhotos');
            debugger
            document.getElementById('albumSelected').innerText = target.innerText;
            jQuery(photoGalleryNode).empty();

            for (index in albumPictures) {
                imageNode = new Image();
                imageNode.src = albumPictures[index].source;
                imageNode.className += "photo";
                photoGalleryNode.appendChild(imageNode);
            }

        }

        </script>
        
        <img id="<?php echo $image['id'] ?>" onclick="alert('picture with id: ' + event.target.id);"src="<?php echo $image['source'] ?>"><br/>

        <p id="albumSelected" class="albumSelected"></p>

        <div id="albumPhotos">

        </div>

        <!-- <canvas id="myCanvas" width="200" height="200" style="border:1px solid #000000;">

        </canvas> -->

        <script>
            
        </script>

        <?php

            }

        ?>

    </body>
</html>