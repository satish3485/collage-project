(function(dust){dust.register("error",body_0);function body_0(chk,ctx){return chk.w("<!DOCTYPE html><html><head><title>").f(ctx.get(["title"], false),ctx,"h").w("</title><link rel='stylesheet' href='/css/style.css' /></head><body><h1>").f(ctx.get(["message"], false),ctx,"h").w("</h1><h2>").f(ctx.getPath(false, ["error","status"]),ctx,"h").w("</h2><pre>").f(ctx.getPath(false, ["error","stack"]),ctx,"h").w("</pre></body></html>");}body_0.__dustBody=!0;return body_0}(dust));