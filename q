[1mdiff --git a/layout/layout.jade b/layout/layout.jade[m
[1mindex ec6a833..1ebfc86 100644[m
[1m--- a/layout/layout.jade[m
[1m+++ b/layout/layout.jade[m
[36m@@ -24,7 +24,7 @@[m [mhtml[m
 					i.fa.fa-gamepad[m
 					span.nav-text Games[m
 				a.button.ajax(href='/drinks')[m
[31m-					i.fa.fa-beer[m
[32m+[m					[32mi.fa.fa-glass[m
 					span.nav-text Drinks[m
 				a.button.ajax(href='/leaderboards')[m
 					i.fa.fa-trophy[m
[36m@@ -35,4 +35,6 @@[m [mhtml[m
 				//- a.button.ajax(href='/settings')[m
 				//- 	i.fa.fa-cog[m
 				//- 	span.nav-text Settings[m
[31m-		main#content.fade!= content[m
\ No newline at end of file[m
[32m+[m		[32mmain#content.fade!= content[m
[32m+[m[41m		[m
[32m+[m		[32m#loading-animation[m
\ No newline at end of file[m
[1mdiff --git a/pages/games/games.js b/pages/games/games.js[m
[1mindex 131ca55..ae098d5 100644[m
[1m--- a/pages/games/games.js[m
[1m+++ b/pages/games/games.js[m
[36m@@ -12,6 +12,8 @@[m [mexports.get = function*(request, response) {[m
 	} else {[m
 		let games = yield db.all('Games')[m
 [m
[32m+[m		[32mgames.sort((a, b) => a.title.localeCompare(b.title))[m
[32m+[m
 		response.render({[m
 			user,[m
 			games[m
[1mdiff --git a/pages/hangouts/hangouts.jade b/pages/hangouts/hangouts.jade[m
[1mindex 83dae46..76cb1f7 100644[m
[1m--- a/pages/hangouts/hangouts.jade[m
[1m+++ b/pages/hangouts/hangouts.jade[m
[36m@@ -20,11 +20,11 @@[m [melse[m
 							li.hangout-member= member.givenName[m
 			[m
 				.hangout-actions[m
[31m-					button.button[m
[32m+[m					[32mbutton.button.action-join[m
 						span.fa.fa-hand-peace-o[m
 						| Join[m
 					[m
[31m-					button.button[m
[32m+[m					[32mbutton.button.action-delete[m
 						span.fa.fa-remove[m
 						| Delete[m
 [m
[1mdiff --git a/pages/hangouts/hangouts.styl b/pages/hangouts/hangouts.styl[m
[1mindex 5da9fe8..ebabcb8 100644[m
[1m--- a/pages/hangouts/hangouts.styl[m
[1m+++ b/pages/hangouts/hangouts.styl[m
[36m@@ -9,11 +9,24 @@[m
 .hangout-actions[m
 	display flex[m
 	flex-flow row wrap[m
[31m-	justify-content flex-end[m
[32m+[m	[32mjustify-content center[m
 	margin-top 0.5em[m
 	.button[m
 		margin-left 0.5em[m
 		flex 1[m
[32m+[m		[32mmax-width 150px[m
[32m+[m
[32m+[m[32m.action-join[m
[32m+[m	[32mbackground rgb(32, 160, 32)[m
[32m+[m
[32m+[m	[32m&:hover[m
[32m+[m		[32mbackground rgb(32, 160, 32) + 20%[m
[32m+[m
[32m+[m[32m.action-delete[m
[32m+[m	[32mbackground rgb(160, 32, 32)[m
[32m+[m
[32m+[m	[32m&:hover[m
[32m+[m		[32mbackground rgb(160, 32, 32) + 20%[m
 [m
 .hangout-members[m
 .hangout-message[m
[36m@@ -36,9 +49,11 @@[m
 		opacity 0.5[m
 		float right[m
 [m
[32m+[m[32m.hangout-datetime[m
[32m+[m	[32mfont-size 0.8em[m
[32m+[m
 .hangout-date, .hangout-time[m
 	display inline-block[m
 	opacity 0.5[m
 	margin 0[m
[31m-	margin-right 1em[m
[31m-	font-size 0.8em[m
\ No newline at end of file[m
[32m+[m	[32mmargin-right 1em[m
\ No newline at end of file[m
[1mdiff --git a/pages/leaderboards/leaderboards.js b/pages/leaderboards/leaderboards.js[m
[1mindex fe00e69..c396a5b 100644[m
[1m--- a/pages/leaderboards/leaderboards.js[m
[1m+++ b/pages/leaderboards/leaderboards.js[m
[36m@@ -2,10 +2,12 @@[m [mexports.get = function*(request, response) {[m
 	let count = {}[m
 [m
 	yield db.forEach('Hangouts', hangout => {[m
[31m-		if(count[hangout.userId] !== undefined)[m
[31m-			count[hangout.userId] += 1[m
[31m-		else[m
[31m-			count[hangout.userId] = 1[m
[32m+[m		[32mhangout.members.forEach(member => {[m
[32m+[m			[32mif(count[member] !== undefined)[m
[32m+[m				[32mcount[member] += 1[m
[32m+[m			[32melse[m
[32m+[m				[32mcount[member] = 1[m
[32m+[m		[32m})[m
 	})[m
 [m
 	let userIds = Object.keys(count).sort((a, b) => count[a] - count[b])[m
[1mdiff --git a/pages/profile/profile.jade b/pages/profile/profile.jade[m
[1mindex 6bf244f..b73da61 100644[m
[1m--- a/pages/profile/profile.jade[m
[1m+++ b/pages/profile/profile.jade[m
[36m@@ -1,7 +1,7 @@[m
 if !user[m
 	p Not logged in.[m
 else[m
[31m-	h2= user.first_name[m
[32m+[m	[32mh2= user.givenName[m
 	[m
 	p[m
 		a.ajax(href='/settings')[m
[1mdiff --git a/scripts/init.js b/scripts/init.js[m
[1mindex cc889e6..28e64d8 100644[m
[1m--- a/scripts/init.js[m
[1m+++ b/scripts/init.js[m
[36m@@ -1,3 +1,5 @@[m
 document.addEventListener('DOMContentLoaded', function(event) {[m
[31m-	$('title').style['transform'] = 'rotateX(0)'[m
[32m+[m	[32mlet title = $('title')[m
[32m+[m	[32mif(title)[m
[32m+[m		[32mtitle.style['transform'] = 'rotateX(0)'[m
 }, { once: true })[m
\ No newline at end of file[m
[1mdiff --git a/styles/base.styl b/styles/base.styl[m
[1mindex 9bc2dbb..be6f071 100644[m
[1m--- a/styles/base.styl[m
[1m+++ b/styles/base.styl[m
[36m@@ -10,7 +10,7 @@[m [mbody[m
 span.fa[m
 	margin-right 0.75em[m
 [m
[31m-a, button[m
[32m+[m[32ma, button, .button[m
 	transition all 250ms ease[m
 	&:active[m
 		transform translateY(3px)[m
\ No newline at end of file[m
[1mdiff --git a/styles/typography.styl b/styles/typography.styl[m
[1mindex 4ce0ad2..67e6884 100644[m
[1m--- a/styles/typography.styl[m
[1m+++ b/styles/typography.styl[m
[36m@@ -16,7 +16,7 @@[m [mol[m
 	list-style-position inside[m
 [m
 li[m
[31m-	padding 0.25em 0[m
[32m+[m	[32mpadding 0.35em 0[m
 [m
 a[m
 	color mainColor[m
