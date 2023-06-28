var timeoutHandle = null
var triesWhereLoadButtonIsHidden = 0
const ID = 'somerandoid-gfgreverbverhhn'
const BUTTON_ID = `button-${ID}`
const RESULTS_ID = `results-${ID}`

function clearArea() {
    var area = document.getElementById(ID)
    if (area === null) {
        var bottomSection = document.getElementsByClassName('load_more_history_area')[0]
        area = document.createElement('div')
        area.setAttribute('id', ID)
        bottomSection.appendChild(area)
    } else {
        area.innerHTML = ''
    }
    var buttonArea = document.createElement('div')
    buttonArea.setAttribute('id', BUTTON_ID)
    area.appendChild(buttonArea)
    var resultsArea = document.createElement('div')
    resultsArea.setAttribute('id', RESULTS_ID)
    area.appendChild(resultsArea)
}

function clearResults() {
    var resultsArea = document.getElementById(RESULTS_ID)
    if (resultsArea === null) {
        var area = document.getElementById(ID)
        var newArea = document.createElement('div')
        newArea.setAttribute('id', RESULTS_ID)
        area.appendChild(newArea)
    } else {
        resultsArea.innerHTML = ''
    }
}

function addSpacer() {
    var area = document.getElementById(ID)
    area.appendChild(document.createElement("br"))
}

function addButton(title, callback) {
    var area = document.getElementById(BUTTON_ID)
    var link = document.createElement("a")
    link.onclick = callback
    var linkContent = document.createElement("div")
    linkContent.className = 'btnv6_blue_hoverfade btn_medium'
    linkContent.style = 'display: inline-block; margin: 5px;'
    linkContent.textContent = title
    link.appendChild(linkContent)
    area.appendChild(link)
}

function addParagraph(text) {
    var area = document.getElementById(RESULTS_ID)
    var paragraphElement = document.createElement("p")
    paragraphElement.innerHTML = text
    area.appendChild(paragraphElement)
    return paragraphElement
}

function fetchHistory() {
    var loadButton = document.getElementById('load_more_button')
    if (loadButton.style.display == "none") {
        triesWhereLoadButtonIsHidden += 1
        if (triesWhereLoadButtonIsHidden > 3) {
            addParagraph("Finished fetching data!")
            calculateLosses()
            return
        }
        timeoutHandle = setTimeout(fetchHistory, 3000)
        return
    }
    triesWhereLoadButtonIsHidden = 0
    loadButton.click()
    timeoutHandle = setTimeout(fetchHistory, 2000)
}

function stopFetchingHistory() {
    window.clearTimeout(timeoutHandle)
}

function calculateLosses() {
    var list = []
    var totals = {}
    var walletItem = document.getElementsByClassName("wallet_table_row_amt_change")
    for (let i = 0; i < walletItem.length; i++) {
        try {
            var parent = walletItem[i]
            var date = Date.parse(parent.getElementsByClassName("wht_date")[0].textContent.trim())
            var tempType = parent.getElementsByClassName("wht_type")[0].textContent.trim()
            var credit = false
            if (tempType.length === 0) {
                continue
            }
            var type = parent.getElementsByClassName("wht_type")[0].children[0].textContent.trim()
            var description = "Steam"
            if (type === 'Purchase') {
                var temp = parent.getElementsByClassName("wht_items")[0].textContent.trim()
                if (temp.includes('Wallet')) {
                    continue
                }
            } else if (type.includes('Market')) {
                description = "Steam Market"
            } else if (type.includes('Refund')) {
                description = "Steam"
            } else {
                var temp = parent.getElementsByClassName("wht_items")[0].textContent.trim()
                if (temp.includes('Gift')) {
                    continue
                }
                description = parent.getElementsByClassName("wht_items")[0].children[0].textContent.trim()
            }
            if (type.includes('Refund')) {
                credit = true
            }
            var amount = parseFloat(parent.getElementsByClassName("wht_total")[0].textContent.trim().replace('$', '').replace('A', ''))
            if (credit) {
                amount = amount * -1
            }
            if (Object.prototype.hasOwnProperty.call(totals, description)) {
                totals[description] += amount
            } else {
                totals[description] = amount
            }
            list.push({
                date: date,
                description: description,
                amount: amount
            })
        } catch (e) {
            console.error(`error on ${i}`)
            console.error(e)
        }
    }

    console.log(list)
    console.log(totals)

    clearResults()

    for (const description in totals) {
        addParagraph(`${description}: $${Math.round((totals[description] + Number.EPSILON) * 100) / 100}`)
    }
}

clearArea()
addSpacer()
addButton("Start fetching history", fetchHistory)
addButton("Stop fetching history", stopFetchingHistory)
addButton("Get dissapointed", calculateLosses)
