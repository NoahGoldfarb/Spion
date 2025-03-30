const categories = {
    "Standorte": ["Flughafen", "Bahnhof", "Schule", "Krankenhaus", "Supermarkt"],
    "Objekte": ["Tisch", "Stuhl", "Lampe", "Buch", "Schlüssel"],
    "Natur": ["Berg", "Fluss", "Wald", "Wiese", "Meer"],
    "Tiere": ["Hund", "Katze", "Pferd", "Kuh", "Schwein"]
};

let players = [];
let assignedWords = [];
let currentIndex = 0;

function toggleManualInput() {
    const category = document.getElementById("category").value;
    const manualInputDiv = document.getElementById("manualInput");
    if (category === "Manuell") {
        manualInputDiv.classList.remove("hidden");
    } else {
        manualInputDiv.classList.add("hidden");
    }
}

function startGame() {
    const playerCount = parseInt(document.getElementById("playerCount").value);
    const spyCount = parseInt(document.getElementById("spyCount").value);
    const category = document.getElementById("category").value;

    if (spyCount >= playerCount) {
        alert("Spies must be fewer than total players!");
        return;
    }

    players = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);

    let mainWord, spyWord;

    if (category === "Manuell") {
        mainWord = document.getElementById("mainWord").value;
        spyWord = document.getElementById("spyWord").value;

        if (!mainWord || !spyWord) {
            alert("Please enter both main and spy words!");
            return;
        }
    } else {
        const words = categories[category];
        mainWord = words[Math.floor(Math.random() * words.length)];
        spyWord = words[Math.floor(Math.random() * words.length)];
        while (spyWord === mainWord) {
            spyWord = words[Math.floor(Math.random() * words.length)];
        }
    }

    assignedWords = Array(playerCount).fill(mainWord);
    for (let i = 0; i < spyCount; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playerCount);
        } while (assignedWords[randomIndex] !== mainWord);
        assignedWords[randomIndex] = spyWord;
    }

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    currentIndex = 0;
    document.getElementById("wordDisplay").classList.add("hidden");
    document.getElementById("nextPlayer").classList.add("hidden");
}

function showWord() {
    document.getElementById("wordDisplay").innerText = assignedWords[currentIndex];
    document.getElementById("wordDisplay").classList.remove("hidden");
    document.getElementById("nextPlayer").classList.remove("hidden");
}

function nextPlayer() {
    currentIndex++;
    if (currentIndex >= players.length) {
        alert("All players have seen their words. Start the game!");
        location.reload(); // Reset game after last player
    } else {
        document.getElementById("wordDisplay").classList.add("hidden");
        document.getElementById("nextPlayer").classList.add("hidden");
    }
}