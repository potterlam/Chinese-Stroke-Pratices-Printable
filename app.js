document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app-container');
    const inputField = document.getElementById('word-input');
    const btnPrintSelected = document.getElementById('btn-print-selected');
    const btnPrintAll = document.getElementById('btn-print-all');

    // Create the Printable Cover Page HTML
    function createCoverPage() {
        return `
            <div class="worksheet-card cover-page">
                <div class="cover-header">
                    <h1 class="cover-title">Traditional Chinese<br>Word Order Practice</h1>
                    <h2 class="cover-subtitle">Beginner Level - 200 Words</h2>
                </div>
                <div class="cover-form">
                    <div class="form-line">
                        <span>Name:</span>
                        <div class="line"></div>
                    </div>
                    <div class="form-line">
                        <span>Date:</span>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate HTML for given words
    function generateSheets(wordsToRender) {
        // Clear previous content
        container.innerHTML = '';

        // Prepend Cover Page
        if (wordsToRender.length > 0) {
            container.innerHTML += createCoverPage();
        }

        // Render each Practice Sheet
        wordsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'worksheet-card';

            card.innerHTML = `
                <div class="top-section">
                    <!-- Left Column -->
                    <div class="left-column">
                        <div class="box word-box">
                            <span class="box-label">Word</span>
                            <div class="box-content word-character">${item.word}</div>
                        </div>
                        <div class="box meaning-box">
                            <span class="box-label">Meaning</span>
                            <div class="box-content">${item.meaning}</div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="right-column">
                        <div class="pronunciation-row">
                            <div class="box jyutping-box">
                                <span class="box-label">Jyutping</span>
                                <div class="box-content">${item.jyutping}</div>
                            </div>
                            <div class="box pinyin-box">
                                <span class="box-label">PinYin</span>
                                <div class="box-content">${item.pinyin}</div>
                            </div>
                            <div class="box pic-box">
                                <span class="box-label">Pic</span>
                                <img src="${item.pic}" class="box-content" alt="${item.word} illustration">
                            </div>
                        </div>
                        <div class="box stroke-name-box">
                            <span class="box-label">Stroke Names</span>
                            <div class="box-content">${item.strokeName}</div>
                        </div>
                        <div class="box stroke-example-box">
                            <span class="box-label">Stroke Order</span>
                            <div class="box-content">${item.strokeOrder}</div>
                        </div>
                    </div>
                </div>

                <div class="bottom-section">
                    <div class="practice-grid">
                        ${Array.from({ length: Math.max(8, item.strokeName.split(',').filter(x => x.trim()).length) }).map(() => `<div class="box practice-box"></div>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Event Listener for "Print All"
    btnPrintAll.addEventListener('click', () => {
        generateSheets(wordsData);
        setTimeout(() => window.print(), 500); // Allow DOM to update first
    });

    // Event Listener for "Print Selected"
    btnPrintSelected.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (!text) {
            alert('Please type some characters in the input field first!');
            return;
        }

        const charsArray = text.split('');
        const selectedWords = [];

        // Check each character against our dataset
        charsArray.forEach(char => {
            const foundData = wordsData.find(w => w.word === char);
            if (foundData) {
                // Ensure no continuous duplicates in the selected render list
                if (!selectedWords.find(sw => sw.word === char)) {
                    selectedWords.push(foundData);
                }
            }
        });

        if (selectedWords.length === 0) {
            alert('None of those characters were found in our 200 Beginner Words dataset. Please try other simple characters like "天", "地", or "人".');
            return;
        }

        generateSheets(selectedWords);
        setTimeout(() => window.print(), 500);
    });
});