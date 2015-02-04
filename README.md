scripts
=======

## styles
These are [Userstyle](http://userstyles.org) scripts

- `style-facebook` - [Facebook Trending Ticker Hider](http://userstyles.org/styles/97489/facebook-trending-ticker-hider)
- `style-youtube` - [Youtube Comment Section Hider](http://userstyles.org/styles/94871/youtube-comment-section-hider)
- `style-wolfram` - hides the background images on [WolframAlpha](http://wolframalpha.com)

## scripts
These are [Userscripts](http://www.greasespot.net/) scripts
- `script-youtube` - Youtube videos page playlist remover

## batch scripts
These are Batch scripts for Microsoft Windows computers

####Monstercat Twitch IRC Pidgin log parser for OBS
A bit of a mouthful, but what it does is takes Pidgin IRC client chat logs in .txt form, parses them for [Monstercat](http://twitch.tv/monstercat) FM's Twitch music streaming service, and formats them for use in [Open Broadcast Software](http://obsproject.org) as a text file.

Required batch files:
- `logparser.bat` - main file to run
- `upper.bat` - helper batch file to convert to all caps. Can be optional if you edit logparser.
- `jrepl.bat` - A regex text processor. Unmodified but kept up to date from this [forum post](http://www.dostips.com/forum/viewtopic.php?f=3&t=6044).

How to use:
- Make sure Pidgin logs files in text format NOT HTML.
- Connect Pidgin to your Twitch IRC channel.
- Make sure you have allowed Monstercat's music bot into your channel.
- Edit `logparser.bat` so that the directory of all of your Pidgin logs is correct.
- Also edit it so that wherever you want the text file for OBS is the location it writes song information to.
- Adjust formatting as necesary. There isn't a good way to do this, it's the last three lines before the timer.
- Save and exit your editor.
- Run - you can either open the batch file directly or you can run it from the command line. It doesn't matter.
- It will check for new "songs" aka messages from the Monstercat bot every 20 seconds and update the text file when it changes.
- Add the file to your OBS/whatever scene and you're good to go.

Bugs:
- Can't go over 15 messages (adjustable) only because I didn't want to parse the entire chunk. You can adjust this limit but be careful.
