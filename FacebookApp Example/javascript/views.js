var Views = FacebookApp.namespace("Views");

Views.drawCanvas = function() {
    var canvas, context, data, DOMURL, img, svg, url;

    canvas                       = document.getElementById("myCanvas");
    context                      = canvas.getContext("2d");
    data                         = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
                                    "<foreignObject width ='100%' height='100%'>" +
                                    "<div xmlns ='http://www.w3.org/1999/xhtml' style='font-size:40px'>" +
                                    "<em>I</em> like <span style ='color:white; text-shadow:0 0 2px blue;'>cheese</span>" +
                                    "</div>" +
                                    "</foreignObject>" +
                                    "</svg>";
    DOMURL                       = self.URL || self.webkitURL || self;
    img                          = new Image();
    svg                          = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
    url                          = DOMURL.createObjectURL(svg);

    img.onload = function() {
        context.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    };
    img.src = url;
}