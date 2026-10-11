@echo off
rem Shows where the site's build time goes.
rem
rem Builds the whole site once and prints a table of every template, include
rem and page: how many times it rendered and how many seconds it took in
rem total, slowest first. The last line is the full build time.
rem
rem How to read it: a layout's time includes everything inside it, so
rem _layouts/default.html is always near the top. Look for an include whose
rem time is close to its layout's. That include is the bottleneck.
rem
rem The build goes to a temp folder, not _site, so this is safe to run while
rem run_local.bat is serving.

call bundle exec jekyll build --profile --destination "%TEMP%\kaud_profile"
