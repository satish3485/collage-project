(function(dust){dust.register("address",body_0);function body_0(chk,ctx){return chk.w("<!DOCTYPE html><html><head><title>").f(ctx.get(["title"], false),ctx,"h").w("</title><link rel='stylesheet' href='/css/style.css' /><script src=\"/js/address-ui.js\"></script><script src=\"/js/dust-core.min.js\"></script></head><body><h1>Address Book</h1><div class=\"lighter\"><form id=\"search\" action=\"/address\" method=\"get\"><span><input type=\"text\" name=\"firstname\" id=\"firstname\" class=\"search img square\" placeholder=\"Firstname\" /><input type=\"text\" name=\"lastname\" id=\"lastname\" class=\"search lastname square\" placeholder=\"Lastname\" /><input id=\"searchbutton\" type=\"submit\" value=\"Search\" /></span></form></div><div id=\"addresses\"><h1 class=\"address-heading\">").f(ctx.get(["title"], false),ctx,"h").w("</h1><ul class=\"address-book\" id=\"address-book\">").s(ctx.get(["contacts"], false),ctx,{"block":body_1},{}).w("</ul></div></body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li class=\"address-record\"><i data-id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"delete\">&times;</i><span class=\"address-title\">").f(ctx.get(["firstname"], false),ctx,"h").w(" ").f(ctx.get(["lastname"], false),ctx,"h").w("</span><dl><dt class=\"address-field\">email:</dt><dd class=\"address-value\">").f(ctx.get(["email"], false),ctx,"h").w("</dd> <br /><dt class=\"address-field\">homepage:</dt><dd class=\"address-value\"><a href=\"").f(ctx.get(["homepage"], false),ctx,"h").w("\">").f(ctx.get(["homepage"], false),ctx,"h").w("</a></dd></dl></li>");}body_1.__dustBody=!0;return body_0}(dust));