# Steam csgo case stats
Fetches your steam inventory history, and the parses the data to calculate how many cases, capsules &amp; patches you have opened

1. Open one of the links below, depending on if you have a custom url on steam or not

   1.1 URL: https://steamcommunity.com/id/{STEAMURL}/inventoryhistory/?app%5B%5D=730

   1.2 URL: https://steamcommunity.com/profiles/{PROFILEID}/inventoryhistory/?app%5B%5D=730

2. Replace **{STEAMURL}** or **{PROFILEID}** with your info and go to the site
3. Once on the page, press F12 and navigate to the console tab
4. Paste the contents of the [csgo-history.js](csgo-history.js) file into the console
5. Scroll to the bottom of the page, and click on: "Start fetching history"
6. Once the script has finished loading, click start fetching history (**IT CAN TAKE A WHILE**), a text message will appear saying: **Finished fetching data!** 
7. You should now see your stats!

![](https://github.com/KlutzyBubbles/steam-history-scripts/blob/main/images/total-cases.png)

Preview of knives opened

![](https://github.com/KlutzyBubbles/steam-history-scripts/blob/main/images/knives.png)


# Steam puchase history totals
Fetches your steam purchase history and sums up how much you have spent in different games. Note: this does not take into account currency changes and was only made from trial and error of my own pruchase history list

1. Go to https://store.steampowered.com/account/history while logged in
2. Once on the page, press F12 and navigate to the console tab
3. Paste the contents of the [purchase-history.js](purchase-history.js) file into the console
4. Once the script has finished loading, click start fetching history (**IT CAN TAKE A WHILE**), a text message will appear saying: **Finished fetching data!** 
5. Click get dissapointed and the totals should be listed